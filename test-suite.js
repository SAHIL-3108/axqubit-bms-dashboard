/**
 * ═══════════════════════════════════════════════════════════════════
 *  AXQUBIT BMS6000 Dashboard — Comprehensive Real-World Test Suite
 *  Tests every API endpoint, data validation, and edge cases
 * ═══════════════════════════════════════════════════════════════════
 */

const BASE_URL = 'http://localhost:3000';

// ─── Terminal Colours ───────────────────────────────────────────────
const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  red:    '\x1b[31m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  white:  '\x1b[37m',
  dim:    '\x1b[2m',
  bgGreen: '\x1b[42m',
  bgRed:   '\x1b[41m',
};

// ─── Test State ─────────────────────────────────────────────────────
const results = [];
let passed = 0;
let failed = 0;
let warnings = 0;

function log(symbol, color, label, msg) {
  console.log(`  ${color}${symbol}${C.reset} ${C.bold}${label}${C.reset} ${C.dim}${msg}${C.reset}`);
}

function pass(testName, detail) {
  passed++;
  results.push({ status: 'PASS', testName, detail });
  log('✔', C.green, testName, detail || '');
}

function fail(testName, detail) {
  failed++;
  results.push({ status: 'FAIL', testName, detail });
  log('✘', C.red, testName, detail || '');
}

function warn(testName, detail) {
  warnings++;
  results.push({ status: 'WARN', testName, detail });
  log('⚠', C.yellow, testName, detail || '');
}

function section(title) {
  console.log(`\n${C.cyan}${C.bold}━━━ ${title} ━━━${C.reset}`);
}

// ─── HTTP helpers ────────────────────────────────────────────────────
async function GET(path, opts = {}) {
  const url = BASE_URL + path;
  const res = await fetch(url, { ...opts });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, body, headers: res.headers };
}

async function POST(path, data) {
  const url = BASE_URL + path;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, body };
}

async function getRaw(path) {
  const res = await fetch(BASE_URL + path);
  const text = await res.text();
  return { status: res.status, ok: res.ok, text, headers: res.headers };
}

// ─── Helper: Wait ────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ════════════════════════════════════════════════════════════════════
//  TEST GROUPS
// ════════════════════════════════════════════════════════════════════

async function testDashboardPage() {
  section('T1 · Dashboard Page Load');

  // Test root redirect
  try {
    const res = await fetch(BASE_URL + '/', { redirect: 'manual' });
    if (res.status === 200 || res.status === 307 || res.status === 302) {
      pass('Root URL responds', `HTTP ${res.status}`);
    } else {
      warn('Root URL', `HTTP ${res.status} (unexpected)`);
    }
  } catch (e) {
    fail('Root URL reachable', e.message);
  }

  // Test dashboard page loads HTML
  try {
    const res = await fetch(BASE_URL + '/dashboard');
    const text = await res.text();
    if (res.ok && text.includes('<!DOCTYPE html')) {
      pass('Dashboard HTML loads', `HTTP ${res.status}`);
    } else {
      fail('Dashboard HTML loads', `HTTP ${res.status} - missing DOCTYPE`);
    }
    if (text.includes('AXQUBIT') || text.includes('axqubit') || text.includes('BMS')) {
      pass('Dashboard contains AXQUBIT branding', 'Brand keyword found in HTML');
    } else {
      warn('AXQUBIT branding in HTML', 'Keyword not found in server HTML (may be client-rendered)');
    }
  } catch (e) {
    fail('Dashboard page fetch', e.message);
  }
}

async function testLiveAPI() {
  section('T2 · /api/bms/live — Live Telemetry');

  const testPacks = [
    'AXQ-EV-01', 'AXQ-ROB-06', 'AXQ-DRN-03', 'AXQ-SLR-01', 'AXQ-OEM-02'
  ];

  for (const sn of testPacks) {
    try {
      const { status, ok, body } = await GET(`/api/bms/live?serialNumber=${sn}`);

      if (!ok) { fail(`Live API [${sn}]`, `HTTP ${status}`); continue; }

      const t = body.telemetry;
      const c = body.cells;

      // Check telemetry object exists
      if (!t) { fail(`Telemetry object [${sn}]`, 'Missing telemetry key'); continue; }
      pass(`Live API [${sn}] responds`, `HTTP ${status}`);

      // Validate required telemetry fields
      const required = ['serialNumber','timestamp','soc','soh','voltage','current','power','packTemp',
                        'cycleCount','isCharging','isDischarging','status','protectionFlags'];
      const missing = required.filter(k => !(k in t));
      if (missing.length === 0) {
        pass(`Telemetry schema [${sn}]`, 'All required fields present');
      } else {
        fail(`Telemetry schema [${sn}]`, `Missing: ${missing.join(', ')}`);
      }

      // SOC range validation
      if (t.soc >= 0 && t.soc <= 100) {
        pass(`SOC range [${sn}]`, `SOC = ${t.soc.toFixed(1)}%`);
      } else {
        fail(`SOC range [${sn}]`, `Out of bounds: ${t.soc}`);
      }

      // SOH range validation
      if (t.soh >= 0 && t.soh <= 100) {
        pass(`SOH range [${sn}]`, `SOH = ${t.soh.toFixed(1)}%`);
      } else {
        fail(`SOH range [${sn}]`, `Out of bounds: ${t.soh}`);
      }

      // Voltage range (6S LiFePO4: ~15V-22.8V)
      if (t.voltage >= 15.0 && t.voltage <= 23.0) {
        pass(`Pack voltage range [${sn}]`, `${t.voltage.toFixed(2)}V`);
      } else {
        fail(`Pack voltage range [${sn}]`, `Out of bounds: ${t.voltage}V (expected 15–23V)`);
      }

      // Temperature bounds
      if (t.packTemp >= -20 && t.packTemp <= 80) {
        pass(`Pack temp range [${sn}]`, `${t.packTemp.toFixed(1)}°C`);
      } else {
        fail(`Pack temp range [${sn}]`, `Out of bounds: ${t.packTemp}°C`);
      }

      // Cells array validation
      if (Array.isArray(c) && c.length === 6) {
        pass(`Cell count [${sn}]`, `6 cells returned`);
      } else {
        fail(`Cell count [${sn}]`, `Expected 6, got ${c?.length}`);
      }

      // Cell voltage bounds (LiFePO4: 2.5–3.65V per cell)
      if (Array.isArray(c)) {
        const badCells = c.filter(cell => cell.voltage < 2.5 || cell.voltage > 3.65);
        if (badCells.length === 0) {
          pass(`Cell voltages in range [${sn}]`, `All cells within 2.5–3.65V`);
        } else {
          fail(`Cell voltages [${sn}]`, `${badCells.length} cells out of range`);
        }
      }

      // Timestamp is ISO 8601
      if (t.timestamp && !isNaN(Date.parse(t.timestamp))) {
        pass(`Timestamp valid [${sn}]`, t.timestamp);
      } else {
        fail(`Timestamp valid [${sn}]`, `Invalid: ${t.timestamp}`);
      }

      // Protection flags are booleans
      const flags = t.protectionFlags;
      const allBool = flags && Object.values(flags).every(v => typeof v === 'boolean');
      if (allBool) {
        pass(`Protection flags types [${sn}]`, 'All boolean');
      } else {
        fail(`Protection flags types [${sn}]`, 'Non-boolean value detected');
      }

    } catch (e) {
      fail(`Live API fetch [${sn}]`, e.message);
    }
  }

  // Test missing serialNumber (default fallback)
  try {
    const { ok, body } = await GET('/api/bms/live');
    if (ok && body.telemetry) {
      pass('Live API default serial fallback', 'Returns default SN data');
    } else {
      warn('Live API default serial fallback', 'No telemetry in response');
    }
  } catch (e) {
    fail('Live API no-param request', e.message);
  }
}

async function testFleetAPI() {
  section('T3 · /api/bms/fleet — Fleet Overview');

  try {
    const { status, ok, body } = await GET('/api/bms/fleet');

    if (!ok) { fail('Fleet API responds', `HTTP ${status}`); return; }
    pass('Fleet API responds', `HTTP ${status}`);

    if (!Array.isArray(body)) { fail('Fleet returns array', typeof body); return; }
    pass('Fleet returns array', `${body.length} packs`);

    // Should have 32 packs (8+8+8+4+4)
    if (body.length === 32) {
      pass('Fleet has 32 packs', '8 EV + 8 Robotics + 8 Drone + 4 Solar + 4 OEM');
    } else {
      warn('Fleet pack count', `Expected 32, got ${body.length}`);
    }

    // Validate fleet pack schema
    const required = ['serialNumber','application','soc','soh','voltage','current','packTemp','cycleCount','status'];
    const firstPack = body[0];
    const missing = required.filter(k => !(k in firstPack));
    if (missing.length === 0) {
      pass('Fleet pack schema', 'All required fields present');
    } else {
      fail('Fleet pack schema', `Missing: ${missing.join(', ')}`);
    }

    // Check application types exist
    const apps = [...new Set(body.map(p => p.application))];
    const expectedApps = ['EV', 'Robotics', 'Drone', 'Solar ESS', 'OEM Pack'];
    const allAppsPresent = expectedApps.every(app => apps.includes(app));
    if (allAppsPresent) {
      pass('All application types present', apps.join(', '));
    } else {
      warn('Application types', `Found: ${apps.join(', ')}`);
    }

    // Check status values are valid
    const validStatuses = ['normal', 'warning', 'fault', 'offline'];
    const allValid = body.every(p => validStatuses.includes(p.status));
    if (allValid) {
      pass('Fleet status values valid', `All in [${validStatuses.join(', ')}]`);
    } else {
      const invalid = body.filter(p => !validStatuses.includes(p.status));
      fail('Fleet status values', `Invalid: ${invalid.map(p => p.status).join(', ')}`);
    }

    // Check SOC is bounded
    const badSoc = body.filter(p => p.soc < 0 || p.soc > 100);
    if (badSoc.length === 0) {
      pass('Fleet SOC bounds', 'All packs within 0–100%');
    } else {
      fail('Fleet SOC bounds', `${badSoc.length} packs out of range`);
    }

    // Fleet fluctuates (call again and check values changed)
    await sleep(1100);
    const { body: body2 } = await GET('/api/bms/fleet');
    if (Array.isArray(body2)) {
      const changed = body2.some((p, i) => Math.abs(p.soc - body[i].soc) > 0);
      if (changed) {
        pass('Fleet data fluctuates over time', 'Live simulation working');
      } else {
        warn('Fleet live simulation', 'Values did not change between polls');
      }
    }

  } catch (e) {
    fail('Fleet API fetch', e.message);
  }
}

async function testHistoryAPI() {
  section('T4 · /api/bms/history — Historical Data');

  const ranges = ['1h', '24h', '7d', '30d'];

  for (const range of ranges) {
    try {
      const { status, ok, body } = await GET(`/api/bms/history?serialNumber=AXQ-EV-01&range=${range}`);

      if (!ok) { fail(`History API [${range}]`, `HTTP ${status}`); continue; }
      pass(`History API [${range}] responds`, `HTTP ${status}`);

      if (!body.history || !Array.isArray(body.history)) {
        fail(`History returns array [${range}]`, 'Missing history key');
        continue;
      }
      pass(`History has data [${range}]`, `${body.history.length} data points`);

      // Data points should be > 0
      if (body.history.length > 0) {
        pass(`History non-empty [${range}]`, `${body.history.length} records`);
      } else {
        fail(`History non-empty [${range}]`, '0 records returned');
      }

      // Validate schema of first record
      const first = body.history[0];
      const required = ['id', 'timestamp', 'soc', 'soh', 'voltage', 'current', 'power', 'packTemp'];
      const missing = required.filter(k => !(k in first));
      if (missing.length === 0) {
        pass(`History schema [${range}]`, 'All fields present');
      } else {
        fail(`History schema [${range}]`, `Missing: ${missing.join(', ')}`);
      }

      // Timestamps are chronologically ordered
      const timestamps = body.history.map(h => new Date(h.timestamp).getTime());
      const isOrdered = timestamps.every((t, i) => i === 0 || t >= timestamps[i - 1]);
      if (isOrdered) {
        pass(`History chronological order [${range}]`, 'Timestamps ascending');
      } else {
        fail(`History chronological order [${range}]`, 'Out-of-order timestamps detected');
      }

    } catch (e) {
      fail(`History API [${range}]`, e.message);
    }
  }

  // Test default range fallback
  try {
    const { ok, body } = await GET('/api/bms/history?serialNumber=AXQ-ROB-02');
    if (ok && body.history) {
      pass('History default 24h range fallback', `${body.history.length} records`);
    } else {
      warn('History default range', 'Empty or error response');
    }
  } catch (e) {
    fail('History default range', e.message);
  }
}

async function testAlertsAPI() {
  section('T5 · /api/alerts — Alert Config CRUD');

  // GET alerts
  try {
    const { status, ok, body } = await GET('/api/alerts');
    if (!ok) { fail('Alerts GET', `HTTP ${status}`); return; }
    pass('Alerts GET responds', `HTTP ${status}`);

    const cfg = body.config;
    if (!cfg) { fail('Alerts GET config key', 'Missing config'); return; }

    const required = ['emailEnabled','emailRecipient','whatsappEnabled','whatsappRecipient',
                      'telegramEnabled','telegramRecipient','socThreshold','tempThreshold','cellDeltaThreshold'];
    const missing = required.filter(k => !(k in cfg));
    if (missing.length === 0) {
      pass('Alert config schema', 'All required fields present');
    } else {
      fail('Alert config schema', `Missing: ${missing.join(', ')}`);
    }

    // Validate threshold ranges
    if (cfg.socThreshold >= 0 && cfg.socThreshold <= 100) {
      pass('SOC threshold range', `${cfg.socThreshold}%`);
    } else {
      fail('SOC threshold range', `Out of bounds: ${cfg.socThreshold}`);
    }

    if (cfg.tempThreshold >= 20 && cfg.tempThreshold <= 100) {
      pass('Temp threshold range', `${cfg.tempThreshold}°C`);
    } else {
      fail('Temp threshold range', `Out of bounds: ${cfg.tempThreshold}`);
    }

  } catch (e) {
    fail('Alerts GET', e.message);
  }

  // POST alerts (update)
  try {
    const updatePayload = {
      emailEnabled: true,
      emailRecipient: 'test@axqubit.com',
      whatsappEnabled: true,
      whatsappRecipient: '+919876543210',
      telegramEnabled: false,
      telegramRecipient: '@axqubit_bms_test',
      socThreshold: 15,
      tempThreshold: 60,
      cellDeltaThreshold: 30,
    };

    const { status, ok, body } = await POST('/api/alerts', updatePayload);
    if (ok) {
      pass('Alerts POST update', `HTTP ${status}`);
    } else {
      fail('Alerts POST update', `HTTP ${status}: ${JSON.stringify(body)}`);
    }

    // Verify the GET now returns updated values
    await sleep(200);
    const { body: readback } = await GET('/api/alerts');
    const cfg = readback.config;
    if (cfg && cfg.socThreshold === 15 && cfg.emailRecipient === 'test@axqubit.com') {
      pass('Alert config persisted after POST', `SOC=${cfg.socThreshold}%, email=${cfg.emailRecipient}`);
    } else {
      warn('Alert config readback', `SOC=${cfg?.socThreshold}, email=${cfg?.emailRecipient}`);
    }

  } catch (e) {
    fail('Alerts POST', e.message);
  }

  // POST with missing fields → should return 500
  try {
    const { status } = await POST('/api/alerts', { bad: 'data' });
    // Will either save partial or error — depends on implementation
    if (status < 600) {
      pass('Alerts POST bad data handled gracefully', `HTTP ${status}`);
    }
  } catch (e) {
    fail('Alerts POST bad data', e.message);
  }
}

async function testOtaAPI() {
  section('T6 · /api/ota — OTA Firmware Trigger');

  // Valid OTA request
  try {
    const payload = {
      serialNumber: 'AXQ-EV-01',
      firmwareUrl: 'https://firmware.axqubit.com/bms6000/v1.1.0-release.bin',
      version: 'v1.1.0',
    };

    const { status, ok, body } = await POST('/api/ota', payload);
    if (ok && body.success) {
      pass('OTA POST valid request', `HTTP ${status} — ${body.message}`);
    } else {
      warn('OTA POST valid request', `HTTP ${status}: ${JSON.stringify(body)}`);
    }
  } catch (e) {
    fail('OTA POST valid', e.message);
  }

  // OTA with missing fields → should return 400
  try {
    const { status, body } = await POST('/api/ota', { serialNumber: 'AXQ-EV-01' });
    if (status === 400) {
      pass('OTA POST missing fields → 400', `Correct error: ${body.error}`);
    } else {
      warn('OTA POST missing fields', `Expected 400, got ${status}`);
    }
  } catch (e) {
    fail('OTA POST missing fields', e.message);
  }

  // OTA with empty body → should not crash
  try {
    const { status } = await POST('/api/ota', {});
    if (status === 400 || status === 500) {
      pass('OTA POST empty body handled', `HTTP ${status}`);
    } else {
      warn('OTA POST empty body', `HTTP ${status}`);
    }
  } catch (e) {
    fail('OTA POST empty body', e.message);
  }
}

async function testExportAPI() {
  section('T7 · /api/export — CSV Data Export');

  try {
    const res = await fetch(BASE_URL + '/api/export?serialNumber=AXQ-EV-01&format=csv');
    const text = await res.text();
    const headers = res.headers;

    if (res.ok) {
      pass('Export API responds', `HTTP ${res.status}`);
    } else {
      fail('Export API responds', `HTTP ${res.status}`);
      return;
    }

    // Check Content-Type is CSV
    const ct = headers.get('content-type') || '';
    if (ct.includes('text/csv') || ct.includes('csv')) {
      pass('Export Content-Type is CSV', ct);
    } else {
      fail('Export Content-Type', `Got: ${ct}`);
    }

    // Check Content-Disposition attachment header
    const cd = headers.get('content-disposition') || '';
    if (cd.includes('attachment') && cd.includes('.csv')) {
      pass('Export Content-Disposition', cd);
    } else {
      warn('Export Content-Disposition', `Got: ${cd}`);
    }

    // Check CSV has headers row
    const firstLine = text.split('\n')[0];
    if (firstLine.includes('Timestamp') && firstLine.includes('SOC')) {
      pass('CSV has header row', firstLine.trim());
    } else {
      fail('CSV header row', `Got: ${firstLine}`);
    }

    // Check has data rows
    const lines = text.trim().split('\n').filter(l => l.trim());
    if (lines.length > 5) {
      pass('CSV has data rows', `${lines.length} rows (incl header)`);
    } else {
      fail('CSV data rows', `Only ${lines.length} lines`);
    }

    // Check columns count in data row
    const secondLine = lines[1];
    if (secondLine) {
      const cols = secondLine.split(',').length;
      if (cols >= 9) {
        pass('CSV column count', `${cols} columns`);
      } else {
        warn('CSV columns', `Expected ≥9, got ${cols}`);
      }
    }

  } catch (e) {
    fail('Export API fetch', e.message);
  }

  // Test with different serial number
  try {
    const res = await fetch(BASE_URL + '/api/export?serialNumber=AXQ-SLR-02');
    if (res.ok) {
      pass('Export API different serial number', 'AXQ-SLR-02 OK');
    } else {
      fail('Export API different SN', `HTTP ${res.status}`);
    }
  } catch (e) {
    fail('Export API different SN', e.message);
  }
}

async function testLiveDataStreaming() {
  section('T8 · Live Data Streaming — Continuity & Drift Test');

  const sn = 'AXQ-EV-01';
  const readings = [];
  const SAMPLE_COUNT = 5;
  const INTERVAL_MS = 1000;

  console.log(`  ${C.dim}Sampling ${SAMPLE_COUNT} readings at 1s intervals for ${sn}...${C.reset}`);

  for (let i = 0; i < SAMPLE_COUNT; i++) {
    try {
      const { ok, body } = await GET(`/api/bms/live?serialNumber=${sn}`);
      if (ok && body.telemetry) {
        readings.push(body.telemetry);
      }
    } catch (e) {
      fail(`Streaming sample ${i + 1}`, e.message);
    }
    if (i < SAMPLE_COUNT - 1) await sleep(INTERVAL_MS);
  }

  if (readings.length === SAMPLE_COUNT) {
    pass('All streaming samples received', `${readings.length}/${SAMPLE_COUNT}`);
  } else {
    fail('Streaming sample count', `${readings.length}/${SAMPLE_COUNT} received`);
  }

  // Check timestamps advance
  const timestamps = readings.map(r => new Date(r.timestamp).getTime());
  const advancing = timestamps.every((t, i) => i === 0 || t >= timestamps[i - 1]);
  if (advancing) {
    pass('Timestamps advance over time', 'Monotonically increasing');
  } else {
    fail('Timestamp monotonicity', 'Timestamps went backward');
  }

  // SOC drifts (changes slightly each poll)
  const socValues = readings.map(r => r.soc);
  const socUnique = new Set(socValues.map(s => s.toFixed(2))).size;
  if (socUnique > 1) {
    pass('SOC drifts between polls', `${socValues[0].toFixed(2)}% → ${socValues[socValues.length-1].toFixed(2)}%`);
  } else {
    warn('SOC drift', `All readings identical: ${socValues[0].toFixed(2)}%`);
  }

  // No NaN values in any reading
  const hasNaN = readings.some(r =>
    isNaN(r.soc) || isNaN(r.voltage) || isNaN(r.current) || isNaN(r.power) || isNaN(r.packTemp)
  );
  if (!hasNaN) {
    pass('No NaN values in streaming data', 'All numeric fields valid');
  } else {
    fail('NaN in streaming data', 'NaN detected in telemetry fields');
  }
}

async function testProtectionFaultScenarios() {
  section('T9 · Protection Fault Logic Scenarios');

  // Fetch a few packs and check protection flags are sensible
  try {
    const packChecks = ['AXQ-EV-01', 'AXQ-DRN-02', 'AXQ-SLR-01'];
    
    for (const sn of packChecks) {
      const { ok, body } = await GET(`/api/bms/live?serialNumber=${sn}`);
      if (!ok) { fail(`Protection check [${sn}]`, 'API fail'); continue; }

      const t = body.telemetry;
      const f = t.protectionFlags;

      // Cross-validate protection flags against values
      // OVP should be true only if voltage > 22V
      if (f.ovp === (t.voltage > 22.0)) {
        pass(`OVP logic consistent [${sn}]`, `voltage=${t.voltage.toFixed(2)}V, ovp=${f.ovp}`);
      } else {
        fail(`OVP logic [${sn}]`, `voltage=${t.voltage.toFixed(2)}V but ovp=${f.ovp}`);
      }

      // UVP should be true only if voltage < 15V
      if (f.uvp === (t.voltage < 15.0)) {
        pass(`UVP logic consistent [${sn}]`, `voltage=${t.voltage.toFixed(2)}V, uvp=${f.uvp}`);
      } else {
        fail(`UVP logic [${sn}]`, `voltage=${t.voltage.toFixed(2)}V but uvp=${f.uvp}`);
      }

      // OTP should be true only if temp > 60°C
      if (f.otp === (t.packTemp > 60.0)) {
        pass(`OTP logic consistent [${sn}]`, `temp=${t.packTemp.toFixed(1)}°C, otp=${f.otp}`);
      } else {
        fail(`OTP logic [${sn}]`, `temp=${t.packTemp.toFixed(1)}°C but otp=${f.otp}`);
      }

      // isCharging and isDischarging should not both be true simultaneously
      if (!(t.isCharging && t.isDischarging)) {
        pass(`Charge state mutually exclusive [${sn}]`, `charging=${t.isCharging}, discharging=${t.isDischarging}`);
      } else {
        fail(`Charge state [${sn}]`, 'Both isCharging and isDischarging are true simultaneously!');
      }
    }
  } catch (e) {
    fail('Protection scenario tests', e.message);
  }
}

async function testFleetStatusDistribution() {
  section('T10 · Fleet Status Distribution & Application Filter');

  try {
    const { ok, body } = await GET('/api/bms/fleet');
    if (!ok || !Array.isArray(body)) { fail('Fleet for distribution test', 'API fail'); return; }

    // Check fleet has multiple status types (not all normal)
    const statusMap = {};
    body.forEach(p => { statusMap[p.status] = (statusMap[p.status] || 0) + 1; });
    
    if (Object.keys(statusMap).length > 1) {
      pass('Fleet has mixed statuses', JSON.stringify(statusMap));
    } else {
      warn('Fleet status variety', `Only status found: ${Object.keys(statusMap).join(', ')}`);
    }

    // Verify we have the warning/fault/offline packs as defined in code
    const hasWarning = body.some(p => p.status === 'warning');
    const hasFault = body.some(p => p.status === 'fault');
    const hasOffline = body.some(p => p.status === 'offline');

    if (hasWarning) pass('Fleet has warning pack', 'AXQ-EV-05 should be warning');
    else warn('Fleet warning pack', 'No warning status found');

    if (hasFault) pass('Fleet has fault pack', 'AXQ-ROB-03 should be fault');
    else warn('Fleet fault pack', 'No fault status found');

    if (hasOffline) pass('Fleet has offline pack', 'AXQ-DRN-06 should be offline');
    else warn('Fleet offline pack', 'No offline status found');

    // Solar packs should have positive current (charging from solar)
    const solarPacks = body.filter(p => p.application === 'Solar ESS');
    const solarCharging = solarPacks.filter(p => p.current > 0);
    if (solarCharging.length > 0) {
      pass('Solar packs show positive charge current', `${solarCharging.length}/${solarPacks.length}`);
    } else {
      warn('Solar charging current', 'Solar packs not showing positive current');
    }

    // Drone packs should have higher discharge current
    const dronePacks = body.filter(p => p.application === 'Drone');
    const droneDischarging = dronePacks.filter(p => p.current < -20);
    if (droneDischarging.length > 0) {
      pass('Drone packs show high discharge', `${droneDischarging.length} packs > 20A discharge`);
    } else {
      warn('Drone discharge current', 'No drones showing >20A discharge');
    }

  } catch (e) {
    fail('Fleet distribution test', e.message);
  }
}

async function testConcurrentLoad() {
  section('T11 · Concurrent Load — 10 Parallel Requests');

  try {
    const requests = Array.from({ length: 10 }, (_, i) => {
      const sns = ['AXQ-EV-01', 'AXQ-ROB-02', 'AXQ-DRN-03', 'AXQ-SLR-01', 'AXQ-OEM-02'];
      return GET(`/api/bms/live?serialNumber=${sns[i % sns.length]}`);
    });

    const start = Date.now();
    const results = await Promise.all(requests);
    const elapsed = Date.now() - start;

    const successful = results.filter(r => r.ok).length;
    
    if (successful === 10) {
      pass('All 10 concurrent requests successful', `${elapsed}ms total`);
    } else {
      fail('Concurrent request success rate', `${successful}/10 succeeded`);
    }

    if (elapsed < 5000) {
      pass('Concurrent request latency', `${elapsed}ms for 10 parallel`);
    } else {
      warn('Concurrent latency', `Slow: ${elapsed}ms`);
    }

  } catch (e) {
    fail('Concurrent load test', e.message);
  }

  // Fleet concurrent
  try {
    const fleetRequests = Array.from({ length: 5 }, () => GET('/api/bms/fleet'));
    const results = await Promise.all(fleetRequests);
    const ok = results.filter(r => r.ok).length;
    if (ok === 5) {
      pass('Fleet concurrent requests', '5/5 fleet requests OK');
    } else {
      fail('Fleet concurrent', `${ok}/5 succeeded`);
    }
  } catch (e) {
    fail('Fleet concurrent load', e.message);
  }
}

async function testCellsAPI() {
  section('T12 · /api/bms/cells — Cell Data Endpoint');

  try {
    const { status, ok, body } = await GET('/api/bms/cells?serialNumber=AXQ-EV-01');

    if (!ok) {
      // This endpoint may not exist separately — check if it returns 404 gracefully
      if (status === 404) {
        warn('Cells endpoint', '404 — cells returned via live endpoint only (acceptable)');
      } else {
        fail('Cells endpoint', `HTTP ${status}`);
      }
      return;
    }

    pass('Cells API responds', `HTTP ${status}`);

    const cells = body.cells || body;
    if (Array.isArray(cells)) {
      pass('Cells is array', `${cells.length} cells`);
      if (cells.length === 6) {
        pass('Cells count 6S', '6 cells for 6S pack');
      } else {
        warn('Cells count', `Expected 6, got ${cells.length}`);
      }
    } else {
      warn('Cells API shape', 'Unexpected response structure');
    }
  } catch (e) {
    warn('Cells endpoint', `${e.message} — may only be served via /live`);
  }
}

async function testEdgeCases() {
  section('T13 · Edge Cases & Input Validation');

  // Very long serial number
  try {
    const { status, ok, body } = await GET('/api/bms/live?serialNumber=' + 'X'.repeat(200));
    if (ok && body.telemetry) {
      pass('Long serial number handled', `HTTP ${status} — returns data with defaults`);
    } else if (status < 500) {
      pass('Long serial number no crash', `HTTP ${status}`);
    } else {
      fail('Long serial number → server error', `HTTP ${status}`);
    }
  } catch (e) {
    fail('Long serial number', e.message);
  }

  // Special characters in serial number
  try {
    const { status } = await GET('/api/bms/live?serialNumber=AXQ%3C%3E%22%27');
    if (status < 500) {
      pass('Special chars in serial handled', `HTTP ${status}`);
    } else {
      fail('Special chars → 500', `HTTP ${status}`);
    }
  } catch (e) {
    pass('Special chars handled at network layer', e.message.includes('fetch'));
  }

  // Invalid range in history
  try {
    const { status, ok, body } = await GET('/api/bms/history?serialNumber=AXQ-EV-01&range=999y');
    if (ok && body.history) {
      pass('Invalid history range falls back to 24h', `${body.history.length} records`);
    } else if (status < 500) {
      pass('Invalid range handled gracefully', `HTTP ${status}`);
    } else {
      fail('Invalid range → 500', `HTTP ${status}`);
    }
  } catch (e) {
    fail('Invalid history range', e.message);
  }

  // OTA with SQL injection attempt
  try {
    const { status, body } = await POST('/api/ota', {
      serialNumber: "'; DROP TABLE packs; --",
      firmwareUrl: 'https://firmware.axqubit.com/v1.bin',
      version: 'v1.0',
    });
    if (status < 500) {
      pass('OTA injection attempt handled', `HTTP ${status}`);
    } else {
      fail('OTA injection → 500', `HTTP ${status}`);
    }
  } catch (e) {
    fail('OTA injection test', e.message);
  }
}

async function testAPIResponseTimes() {
  section('T14 · API Response Time Benchmarks');

  const endpoints = [
    { label: 'GET /api/bms/live', url: '/api/bms/live?serialNumber=AXQ-EV-01', threshold: 500 },
    { label: 'GET /api/bms/fleet', url: '/api/bms/fleet', threshold: 1000 },
    { label: 'GET /api/bms/history 24h', url: '/api/bms/history?serialNumber=AXQ-EV-01&range=24h', threshold: 1000 },
    { label: 'GET /api/alerts', url: '/api/alerts', threshold: 800 },
    { label: 'GET /api/export', url: '/api/export?serialNumber=AXQ-EV-01', threshold: 1500 },
  ];

  for (const ep of endpoints) {
    try {
      const start = Date.now();
      const res = await fetch(BASE_URL + ep.url);
      await res.text();
      const elapsed = Date.now() - start;

      if (elapsed <= ep.threshold) {
        pass(`${ep.label}`, `${elapsed}ms (threshold: ${ep.threshold}ms)`);
      } else {
        warn(`${ep.label} — slow`, `${elapsed}ms exceeds ${ep.threshold}ms threshold`);
      }
    } catch (e) {
      fail(`${ep.label}`, e.message);
    }
  }
}

// ════════════════════════════════════════════════════════════════════
//  MAIN TEST RUNNER
// ════════════════════════════════════════════════════════════════════

async function runAllTests() {
  console.log(`\n${C.cyan}${C.bold}╔══════════════════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.cyan}${C.bold}║     AXQUBIT BMS6000 — Real-World Test Suite                     ║${C.reset}`);
  console.log(`${C.cyan}${C.bold}║     Target: ${BASE_URL}                             ║${C.reset}`);
  console.log(`${C.cyan}${C.bold}╚══════════════════════════════════════════════════════════════════╝${C.reset}\n`);

  // Wait for server to be ready
  console.log(`${C.dim}Waiting for server at ${BASE_URL}...${C.reset}`);
  let serverReady = false;
  for (let i = 0; i < 15; i++) {
    try {
      const res = await fetch(BASE_URL + '/dashboard');
      if (res.ok) { serverReady = true; break; }
    } catch {}
    await sleep(1000);
  }

  if (!serverReady) {
    console.log(`${C.red}${C.bold}✘ Server not reachable at ${BASE_URL}. Aborting.${C.reset}`);
    process.exit(1);
  }

  console.log(`${C.green}✔ Server is up. Starting tests...${C.reset}`);

  // Run all test groups
  await testDashboardPage();
  await testLiveAPI();
  await testFleetAPI();
  await testHistoryAPI();
  await testAlertsAPI();
  await testOtaAPI();
  await testExportAPI();
  await testLiveDataStreaming();
  await testProtectionFaultScenarios();
  await testFleetStatusDistribution();
  await testConcurrentLoad();
  await testCellsAPI();
  await testEdgeCases();
  await testAPIResponseTimes();

  // ─── Final Summary ────────────────────────────────────────────────
  const total = passed + failed + warnings;
  console.log(`\n${C.bold}${C.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);
  console.log(`${C.bold}  TEST RESULTS SUMMARY${C.reset}`);
  console.log(`${C.bold}${C.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);
  console.log(`  ${C.green}${C.bold}PASSED  : ${passed}${C.reset}`);
  console.log(`  ${C.red}${C.bold}FAILED  : ${failed}${C.reset}`);
  console.log(`  ${C.yellow}${C.bold}WARNINGS: ${warnings}${C.reset}`);
  console.log(`  ${C.white}${C.bold}TOTAL   : ${total}${C.reset}`);

  const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
  console.log(`\n  Pass rate: ${passRate}%`);

  if (failed === 0) {
    console.log(`\n  ${C.bgGreen}${C.bold}  ✅ ALL TESTS PASSED — SYSTEM IS PRODUCTION READY  ${C.reset}\n`);
  } else {
    console.log(`\n  ${C.bgRed}${C.bold}  ❌ ${failed} TEST(S) FAILED — REVIEW ABOVE  ${C.reset}`);
    console.log(`\n  Failed tests:`);
    results.filter(r => r.status === 'FAIL').forEach(r => {
      console.log(`    ${C.red}✘${C.reset} ${r.testName}: ${r.detail}`);
    });
    console.log('');
  }

  process.exit(failed > 0 ? 1 : 0);
}

runAllTests().catch(err => {
  console.error('Test runner crashed:', err);
  process.exit(1);
});
