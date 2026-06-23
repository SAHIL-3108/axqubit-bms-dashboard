import numpy as np
from typing import List, Dict, Any

def project_soh_linear(current_cycle: int, history_samples: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Fits a linear regression curve (y = mx + c) to project SOH capacity fade.
    Predicts Remaining Useful Life (RUL) until battery hits 80% EOL.
    """
    DEFAULT_SLOPE = -0.0066
    DEFAULT_INTERCEPT = 100.0
    EOL_SOH = 80.0

    m = DEFAULT_SLOPE
    c = DEFAULT_INTERCEPT

    # Filter out empty or noise samples
    valid_samples = [s for s in history_samples if s.get("cycleCount") is not None and s.get("soh") is not None]

    if len(valid_samples) >= 3:
        x = np.array([float(s["cycleCount"]) for s in valid_samples])
        y = np.array([float(s["soh"]) for s in valid_samples])

        try:
            # Fit first-degree polynomial
            fit = np.polyfit(x, y, 1)
            m = float(fit[0])
            c = float(fit[1])

            # Force negative slope to capture degradation, prevent noise anomaly
            if m >= 0:
                m = DEFAULT_SLOPE
                c = 100.0
        except Exception:
            pass

    projected_soh = max(0.0, min(100.0, m * current_cycle + c))

    # total_cycles = (80 - c) / m
    try:
        estimated_total_cycles = int(round((EOL_SOH - c) / m))
        if estimated_total_cycles <= 0 or estimated_total_cycles > 10000:
            estimated_total_cycles = 3000
    except ZeroDivisionError:
        estimated_total_cycles = 3000

    remaining_cycles = max(0, estimated_total_cycles - current_cycle)

    return {
        "projectedSoh": round(projected_soh, 2),
        "remainingCycles": remaining_cycles,
        "estimatedTotalCycles": estimated_total_cycles,
        "slope": round(m, 6)
    }

def detect_cell_imbalance(cells: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Checks voltage deviations across the 6 series cells.
    Flags an imbalance if voltage deviation > 25mV (0.025V) from average.
    """
    if not cells:
        return {"outlierDetected": False, "degradedCellNumbers": [], "packAverage": 0.0, "maxDeviationMv": 0.0}

    voltages = [float(c["voltage"]) for c in cells]
    avg_voltage = sum(voltages) / len(voltages)
    
    DEGRADATION_THRESHOLD_V = 0.025 # 25mV
    degraded_cells = []
    max_deviation = 0.0

    for c in cells:
        dev = abs(float(c["voltage"]) - avg_voltage)
        if dev > max_deviation:
            max_deviation = dev
        if dev > DEGRADATION_THRESHOLD_V:
            degraded_cells.append(int(c["cellNumber"]))

    return {
        "outlierDetected": len(degraded_cells) > 0,
        "degradedCellNumbers": degraded_cells,
        "packAverage": round(avg_voltage, 3),
        "maxDeviationMv": round(max_deviation * 1000, 1)
    }

def diagnose_charging_stress(current: float, nominal_capacity: float, soc: float) -> Dict[str, Any]:
    """
    Evaluates net current and checks C-rate bounds.
    Flags warning if |current| / nominal_capacity > 0.3C limit.
    """
    c_rate = current / nominal_capacity
    abs_c_rate = abs(c_rate)
    CRATE_THRESHOLD = 0.3

    if current > 0:
        if soc >= 98:
            return {
                "flag": False,
                "message": "Near full charge. Charger is safely tapering down output in CV mode.",
                "cRate": round(c_rate, 2),
                "status": "optimal"
            }
        if abs_c_rate > CRATE_THRESHOLD:
            return {
                "flag": True,
                "message": f"High charge rate ({abs_c_rate:.2f}C). Exceeds LFP longevity target (0.3C). Taper charger output to prevent node plating.",
                "cRate": round(c_rate, 2),
                "status": "warning"
            }
        return {
            "flag": False,
            "message": "Charging current is in optimal LFP cycle range.",
            "cRate": round(c_rate, 2),
            "status": "optimal"
        }
    elif current < 0:
        if abs_c_rate > CRATE_THRESHOLD:
            return {
                "flag": True,
                "message": f"Heavy load draw ({abs_c_rate:.2f}C). Exceeds continuous rate longevity limits. Check thermals.",
                "cRate": round(c_rate, 2),
                "status": "warning"
            }
        return {
            "flag": False,
            "message": "Discharge C-rate within safe continuous parameters.",
            "cRate": round(c_rate, 2),
            "status": "optimal"
        }

    return {
        "flag": False,
        "message": "Pack idle. Self-discharge rates are within normal specifications.",
        "cRate": 0.0,
        "status": "optimal"
    }

def get_maintenance_forecast(cycle_count: int) -> Dict[str, Any]:
    """
    Schedules active physical checks (busbar torques, manual balance checks) every 100 cycles.
    """
    INTERVAL = 100
    next_service = int(np.ceil((cycle_count + 0.1) / INTERVAL) * INTERVAL)
    cycles_to_go = next_service - cycle_count

    if cycles_to_go <= 10:
        return {
            "recommendService": True,
            "message": f"BMS has recorded {cycle_count} cycles. Physical service recommended in {cycles_to_go} cycles: manual cell balancing and busbar torque validation.",
            "nextServiceAt": next_service
        }

    return {
        "recommendService": False,
        "message": f"Next physical check scheduled at {next_service} cycles (in {cycles_to_go} cycles).",
        "nextServiceAt": next_service
    }
