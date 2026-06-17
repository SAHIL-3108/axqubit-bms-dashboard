import { CellData } from '@/types/bms';

interface SohSample {
  cycleCount: number;
  soh: number;
}

/**
 * Projects the SOH degradation curve using Linear Regression (y = mx + c).
 * Predicts the remaining cycles until the battery hits the end-of-life (80% SOH).
 */
export function projectSoh(
  currentCycleCount: number,
  samples: SohSample[]
): {
  projectedSoh: number;
  remainingCycles: number;
  estimatedTotalCycles: number;
  slope: number;
} {
  // Standard LFP cells have ~3000 cycles lifetime to 80% SOH.
  // Standard degradation is approx -0.0066% per cycle.
  const DEFAULT_SLOPE = -0.0066;
  const DEFAULT_INTERCEPT = 100;
  const EOL_SOH = 80;

  let m = DEFAULT_SLOPE;
  let c = DEFAULT_INTERCEPT;

  // Perform linear regression if we have at least 3 samples to avoid noise errors
  if (samples && samples.length >= 3) {
    const n = samples.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    for (const sample of samples) {
      sumX += sample.cycleCount;
      sumY += sample.soh;
      sumXY += sample.cycleCount * sample.soh;
      sumXX += sample.cycleCount * sample.cycleCount;
    }

    const denominator = n * sumXX - sumX * sumX;
    if (denominator !== 0) {
      m = (n * sumXY - sumX * sumY) / denominator;
      c = (sumY - m * sumX) / n;

      // Sanity check: slope must be negative (degradation)
      // If slope is positive or flat due to noise, fallback to standard slope
      if (m >= 0) {
        m = DEFAULT_SLOPE;
        c = 100;
      }
    }
  }

  // Calculate current projected SOH
  const projectedSoh = Math.max(0, Math.min(100, m * currentCycleCount + c));

  // Predict when SOH hits EOL (80%)
  // 80 = m * totalCycles + c => totalCycles = (80 - c) / m
  let estimatedTotalCycles = Math.round((EOL_SOH - c) / m);
  if (estimatedTotalCycles <= 0 || estimatedTotalCycles > 10000) {
    estimatedTotalCycles = 3000; // standard fallback
  }

  const remainingCycles = Math.max(0, estimatedTotalCycles - currentCycleCount);

  return {
    projectedSoh: parseFloat(projectedSoh.toFixed(2)),
    remainingCycles,
    estimatedTotalCycles,
    slope: parseFloat(m.toFixed(6)),
  };
}

/**
 * Detects if any LFP cell has deviated by more than 25mV (0.025V) from the pack average.
 * Large cell-to-cell delta voltage indicates cell degradation or unbalance.
 */
export function detectCellDegradation(cells: CellData[]): {
  outlierDetected: boolean;
  degradedCellNumbers: number[];
  packAverage: number;
  maxDeviationMv: number;
} {
  if (!cells || cells.length === 0) {
    return { outlierDetected: false, degradedCellNumbers: [], packAverage: 0, maxDeviationMv: 0 };
  }

  const sumVoltages = cells.reduce((sum, cell) => sum + cell.voltage, 0);
  const averageVoltage = sumVoltages / cells.length;

  const DEGRADATION_THRESHOLD_V = 0.025; // 25mV
  const degradedCellNumbers: number[] = [];
  let maxDeviation = 0;

  cells.forEach((cell) => {
    const deviation = Math.abs(cell.voltage - averageVoltage);
    if (deviation > maxDeviation) {
      maxDeviation = deviation;
    }
    if (deviation > DEGRADATION_THRESHOLD_V) {
      degradedCellNumbers.push(cell.cellNumber);
    }
  });

  return {
    outlierDetected: degradedCellNumbers.length > 0,
    degradedCellNumbers,
    packAverage: parseFloat(averageVoltage.toFixed(3)),
    maxDeviationMv: parseFloat((maxDeviation * 1000).toFixed(1)),
  };
}

/**
 * Returns battery usage and charging advice.
 * Warns if current C-rate exceeds the nominal 0.3C threshold (LFP longevity recommendation).
 */
export function getChargingAdvice(
  current: number, // in Amperes (positive = charging, negative = discharging)
  nominalCapacity: number, // in Ah
  soc: number
): {
  flag: boolean;
  message: string;
  cRate: number;
  status: 'optimal' | 'warning' | 'critical';
} {
  const cRate = current / nominalCapacity;
  const absCurrent = Math.abs(current);
  const absCRate = absCurrent / nominalCapacity;

  // LFP recommendation: Keep continuous charge/discharge under 0.3C for cycle longevity.
  const CRATE_THRESHOLD = 0.3;

  if (current > 0) {
    // Charging advice
    if (soc >= 98) {
      return {
        flag: false,
        message: 'Battery is nearly fully charged. Charge rate will naturally taper down in Absorption/Float mode.',
        cRate: parseFloat(cRate.toFixed(2)),
        status: 'optimal',
      };
    }
    if (absCRate > CRATE_THRESHOLD) {
      return {
        flag: true,
        message: `High charge current detected (${absCRate.toFixed(2)}C). Exceeds LFP nominal longevity target (0.3C). Recommend reducing charger output to prevent cell stress.`,
        cRate: parseFloat(cRate.toFixed(2)),
        status: 'warning',
      };
    }
    return {
      flag: false,
      message: 'Charging is in normal range. Heat generation is optimal.',
      cRate: parseFloat(cRate.toFixed(2)),
      status: 'optimal',
    };
  } else if (current < 0) {
    // Discharging advice
    if (absCRate > CRATE_THRESHOLD) {
      return {
        flag: true,
        message: `High load demand (${absCRate.toFixed(2)}C). Rapid discharge reduces cycle life and generates cell heat. Ensure temperature stays below 45°C.`,
        cRate: parseFloat(cRate.toFixed(2)),
        status: 'warning',
      };
    }
    return {
      flag: false,
      message: 'Discharge rate is healthy. Active loads are within safe nominal capacity.',
      cRate: parseFloat(cRate.toFixed(2)),
      status: 'optimal',
    };
  }

  // Idle advice
  return {
    flag: false,
    message: 'System is idle. Passive self-discharge for LFP chemistry is negligible (<3% per month).',
    cRate: 0,
    status: 'optimal',
  };
}

/**
 * Recommends physical maintenance (manual balance check and busbar retorque) every 100 cycles.
 */
export function recommendMaintenance(cycleCount: number): {
  recommendService: boolean;
  message: string;
  nextServiceAt: number;
} {
  const SERVICE_INTERVAL = 100;
  const nextServiceAt = Math.ceil((cycleCount + 0.1) / SERVICE_INTERVAL) * SERVICE_INTERVAL;
  const cyclesToNext = nextServiceAt - cycleCount;

  if (cyclesToNext <= 10) {
    return {
      recommendService: true,
      message: `System has reached ${cycleCount} cycles. Recommend scheduled check in ${cyclesToNext} cycles: manual cell voltage balance test, and inspection/retorquing of LFP terminal busbars.`,
      nextServiceAt,
    };
  }

  return {
    recommendService: false,
    message: `Next scheduled physical maintenance at ${nextServiceAt} cycles (in ${cyclesToNext} cycles).`,
    nextServiceAt,
  };
}
