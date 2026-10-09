const CFG = {
  TIMEZONE: 'Asia/Bangkok',
  SHEET_NAME: 'Documents',
  HTML_FILE: 'index'
};

function secret_(key) {
  const value = typeof SECRETS === 'undefined' ? '' : SECRETS[key];
  if (!value) throw new Error('ยังไม่ได้ตั้งค่า ' + key + ' ในไฟล์ config.js');
  return value;
}

function openSpreadsheet_() {
  return SpreadsheetApp.openById(secret_('SPREADSHEET_ID'));
}

const USER_CFG = {
  SHEET_NAME: 'Users',
  HEADERS: [
    'username',
    'password',
    'role',
    'name',
    'department',
    'position',
    'active',
    'created_at_iso',
    'updated_at_iso'
  ],
  DEFAULT_USERS: [
    ['staff', 'เจ้าหน้าที่', 'เจ้าหน้าที่สารบรรณ', '', 'เจ้าหน้าที่สารบรรณ', true],
    ['supervisor', 'หัวหน้างาน', 'หัวหน้างานสารบรรณ', '', 'หัวหน้างานสารบรรณ', true],
    ['executive', 'ผู้บริหาร', 'ผู้บริหาร', '', 'ผู้บริหาร', true],
    ['admin', 'ผู้ดูแลระบบ', 'ผู้ดูแลระบบ', '', 'ผู้ดูแลระบบ', true],
    ['deputy_resource', 'รองผู้อำนวยการ', 'รองผู้อำนวยการฝ่ายบริหารทรัพยากร', 'ฝ่ายบริหารทรัพยากร', 'รองผู้อำนวยการ', true],
    ['deputy_academic', 'รองผู้อำนวยการ', 'รองผู้อำนวยการฝ่ายวิชาการ', 'ฝ่ายวิชาการ', 'รองผู้อำนวยการ', true],
    ['deputy_student', 'รองผู้อำนวยการ', 'รองผู้อำนวยการฝ่ายกิจการนักเรียน นักศึกษา', 'ฝ่ายกิจการนักเรียน นักศึกษา', 'รองผู้อำนวยการ', true],
    ['deputy_plan', 'รองผู้อำนวยการ', 'รองผู้อำนวยการฝ่ายยุทธศาสตร์และแผนงาน', 'ฝ่ายยุทธศาสตร์และแผนงาน', 'รองผู้อำนวยการ', true],
    ['director', 'ผู้อำนวยการ', 'ผู้อำนวยการ', '', 'ผู้อำนวยการ', true],
    ['work_admin', 'งาน/แผนก', 'เจ้าหน้าที่งานบริหารงานทั่วไป', 'งานบริหารงานทั่วไป', 'เจ้าหน้าที่', true],
    ['work_hr', 'งาน/แผนก', 'เจ้าหน้าที่งานบริหารและพัฒนาทรัพยากรบุคคล', 'งานบริหารและพัฒนาทรัพยากรบุคคล', 'เจ้าหน้าที่', true],
    ['work_finance', 'งาน/แผนก', 'เจ้าหน้าที่งานการเงิน', 'งานการเงิน', 'เจ้าหน้าที่', true],
    ['work_account', 'งาน/แผนก', 'เจ้าหน้าที่งานการบัญชี', 'งานการบัญชี', 'เจ้าหน้าที่', true],
    ['work_supply', 'งาน/แผนก', 'เจ้าหน้าที่งานพัสดุ', 'งานพัสดุ', 'เจ้าหน้าที่', true],
    ['work_building', 'งาน/แผนก', 'เจ้าหน้าที่งานอาคารสถานที่', 'งานอาคารสถานที่', 'เจ้าหน้าที่', true],
    ['work_register', 'งาน/แผนก', 'เจ้าหน้าที่งานทะเบียน', 'งานทะเบียน', 'เจ้าหน้าที่', true],
    ['work_strategy', 'งาน/แผนก', 'เจ้าหน้าที่งานพัฒนายุทธศาสตร์ แผนงานและงบประมาณ', 'งานพัฒนายุทธศาสตร์ แผนงานและงบประมาณ', 'เจ้าหน้าที่', true],
    ['work_qa', 'งาน/แผนก', 'เจ้าหน้าที่งานมาตรฐานและการประกันคุณภาพการศึกษา', 'งานมาตรฐานและการประกันคุณภาพการศึกษา', 'เจ้าหน้าที่', true],
    ['work_digital', 'งาน/แผนก', 'เจ้าหน้าที่งานศูนย์ดิจิทัลและสื่อสารองค์กร', 'งานศูนย์ดิจิทัลและสื่อสารองค์กร', 'เจ้าหน้าที่', true],
    ['work_research', 'งาน/แผนก', 'เจ้าหน้าที่งานส่งเสริมการวิจัย นวัตกรรม และสิ่งประดิษฐ์', 'งานส่งเสริมการวิจัย นวัตกรรม และสิ่งประดิษฐ์', 'เจ้าหน้าที่', true],
    ['work_business', 'งาน/แผนก', 'เจ้าหน้าที่งานส่งเสริมธุรกิจและการเป็นผู้ประกอบการ', 'งานส่งเสริมธุรกิจและการเป็นผู้ประกอบการ', 'เจ้าหน้าที่', true],
    ['work_eval', 'งาน/แผนก', 'เจ้าหน้าที่งานติดตามและประเมินผลการอาชีวศึกษา', 'งานติดตามและประเมินผลการอาชีวศึกษา', 'เจ้าหน้าที่', true],
    ['work_activity', 'งาน/แผนก', 'เจ้าหน้าที่งานกิจกรรมนักเรียน นักศึกษา', 'งานกิจกรรมนักเรียน นักศึกษา', 'เจ้าหน้าที่', true],
    ['work_counsel', 'งาน/แผนก', 'เจ้าหน้าที่งานครูที่ปรึกษาและการแนะแนว', 'งานครูที่ปรึกษาและการแนะแนว', 'เจ้าหน้าที่', true],
    ['work_discipline', 'งาน/แผนก', 'เจ้าหน้าที่งานปกครองและความปลอดภัยนักเรียน นักศึกษา', 'งานปกครองและความปลอดภัยนักเรียน นักศึกษา', 'เจ้าหน้าที่', true],
    ['work_welfare', 'งาน/แผนก', 'เจ้าหน้าที่งานสวัสดิการนักเรียน นักศึกษา', 'งานสวัสดิการนักเรียน นักศึกษา', 'เจ้าหน้าที่', true],
    ['work_project', 'งาน/แผนก', 'เจ้าหน้าที่งานโครงการพิเศษและการบริการ', 'งานโครงการพิเศษและการบริการ', 'เจ้าหน้าที่', true],
    ['work_curriculum', 'งาน/แผนก', 'เจ้าหน้าที่งานพัฒนาหลักสูตรและการจัดการเรียนรู้', 'งานพัฒนาหลักสูตรและการจัดการเรียนรู้', 'เจ้าหน้าที่', true],
    ['work_assessment', 'งาน/แผนก', 'เจ้าหน้าที่งานวัดผลและประเมินผล', 'งานวัดผลและประเมินผล', 'เจ้าหน้าที่', true],
    ['work_dual', 'งาน/แผนก', 'เจ้าหน้าที่งานอาชีวศึกษาระบบทวิภาคีและความร่วมมือ', 'งานอาชีวศึกษาระบบทวิภาคีและความร่วมมือ', 'เจ้าหน้าที่', true],
    ['work_media', 'งาน/แผนก', 'เจ้าหน้าที่งานวิทยบริการและเทคโนโลยีการศึกษา', 'งานวิทยบริการและเทคโนโลยีการศึกษา', 'เจ้าหน้าที่', true],
    ['work_inclusive', 'งาน/แผนก', 'เจ้าหน้าที่งานการศึกษาพิเศษและความเสมอภาคทางการศึกษา', 'งานการศึกษาพิเศษและความเสมอภาคทางการศึกษา', 'เจ้าหน้าที่', true],
    ['work_techcurr', 'งาน/แผนก', 'เจ้าหน้าที่งานพัฒนาหลักสูตรสายเทคโนโลยีหรือสายปฏิบัติการ', 'งานพัฒนาหลักสูตรสายเทคโนโลยีหรือสายปฏิบัติการ', 'เจ้าหน้าที่', true],
    ['dept_general', 'งาน/แผนก', 'เจ้าหน้าที่แผนกวิชาสามัญสัมพันธ์', 'แผนกวิชาสามัญสัมพันธ์', 'เจ้าหน้าที่', true],
    ['dept_welding', 'งาน/แผนก', 'เจ้าหน้าที่แผนกวิชาช่างเชื่อมโลหะ', 'แผนกวิชาช่างเชื่อมโลหะ', 'เจ้าหน้าที่', true],
    ['dept_industry', 'งาน/แผนก', 'เจ้าหน้าที่แผนกวิชาเทคนิคอุตสาหกรรม', 'แผนกวิชาเทคนิคอุตสาหกรรม', 'เจ้าหน้าที่', true],
    ['dept_ict', 'งาน/แผนก', 'เจ้าหน้าที่แผนกวิชาเทคโนโลยีสารสนเทศและการสื่อสาร', 'แผนกวิชาเทคโนโลยีสารสนเทศและการสื่อสาร', 'เจ้าหน้าที่', true],
    ['dept_automotive', 'งาน/แผนก', 'เจ้าหน้าที่แผนกวิชาช่างยนต์', 'แผนกวิชาช่างยนต์', 'เจ้าหน้าที่', true],
    ['dept_mechanic', 'งาน/แผนก', 'เจ้าหน้าที่แผนกวิชาเทคนิคเครื่องกล', 'แผนกวิชาเทคนิคเครื่องกล', 'เจ้าหน้าที่', true],
    ['dept_basic', 'งาน/แผนก', 'เจ้าหน้าที่แผนกวิชาเทคนิคพื้นฐาน', 'แผนกวิชาเทคนิคพื้นฐาน', 'เจ้าหน้าที่', true],
    ['dept_electrical', 'งาน/แผนก', 'เจ้าหน้าที่แผนกวิชาช่างไฟฟ้า', 'แผนกวิชาช่างไฟฟ้า', 'เจ้าหน้าที่', true]
  ]
};

const HEADERS = [
  'id',
  'rn',
  'ra',
  'dn',
  'dd',
  'title',
  'fr',
  'to',
  'src',
  'urgency',
  'file_name',
  'file_mime',
  'file_size',
  'drive_file_id',
  'drive_file_url',
  'sorted',
  'sd_json',
  'sn',
  'sby',
  'spos',
  'sa',
  'dst_json',
  'stampA_json',   // ← ชื่อนี้ใช้เป็น canonical key ใน sheet
  'stampSv_json',  // ← ชื่อนี้ใช้เป็น canonical key ใน sheet
  'amends_json',
  'created_by',
  'created_by_username',
  'created_at_iso',
  'updated_at_iso',
  'replyDue'
];

const HEADER_ALIASES = {
  id: ['id', 'doc_id', 'document_id', 'รหัส', 'รหัสเอกสาร'],
  rn: ['rn', 'running_no', 'เลขรับ', 'เลขรับหนังสือ'],
  ra: ['ra', 'received_at', 'received_date', 'วันที่รับ', 'วันรับ', 'วันที่รับเข้า'],
  dn: ['dn', 'doc_no', 'document_no', 'เลขหนังสือ', 'เลขที่หนังสือ', 'เลขหนังสือเข้า'],
  dd: ['dd', 'doc_date', 'document_date', 'วันที่หนังสือ', 'ลงวันที่'],
  title: ['title', 'subject', 'เรื่อง', 'ชื่อเรื่อง'],
  fr: ['fr', 'from', 'sender', 'จาก', 'หน่วยงานต้นเรื่อง'],
  to: ['to', 'recipient', 'ถึง'],
  src: ['src', 'source', 'doc_source', 'source_of_document', 'ที่มาของหนังสือ', 'ช่องทางรับหนังสือ'],
  urgency: ['urgency', 'urgent', 'priority', 'ความด่วน', 'ด่วน', 'ชั้นความด่วน'],
  file_name: ['file_name', 'filename', 'file', 'ชื่อไฟล์', 'ไฟล์'],
  file_mime: ['file_mime', 'mime', 'mime_type', 'file_type', 'ชนิดไฟล์', 'ประเภทไฟล์'],
  file_size: ['file_size', 'size', 'ขนาดไฟล์'],
  drive_file_id: ['drive_file_id', 'drivefileid', 'file_id', 'drive_id', 'ไฟล์ไดรฟ์', 'รหัสไฟล์ไดรฟ์'],
  drive_file_url: ['drive_file_url', 'drivefileurl', 'file_url', 'url', 'ลิงก์ไฟล์', 'urlไฟล์'],
  sorted: ['sorted', 'is_sorted', 'คัดแยกแล้ว', 'สถานะคัดแยก', 'sorted_status'],
  sd_json: ['sd_json', 'selected_depts', 'ฝ่ายที่รับ', 'ฝ่ายที่ส่งต่อ', 'ส่งถึงฝ่าย', 'ฝ่าย'],
  sn: ['sn', 'sort_note', 'คำสั่ง'],
  sby: ['sby', 'sorted_by', 'สั่งโดย', 'ผู้สั่ง'],
  spos: ['spos', 'sort_position', 'ตำแหน่งผู้สั่ง'],
  sa: ['sa', 'sort_annotation', 'หมายเหตุคำสั่ง', 'หมายเหตุ'],
  dst_json: ['dst_json', 'dept_status', 'ข้อมูลการรับของฝ่าย'],
  // ── FIX: เพิ่ม alias ทุกรูปแบบที่อาจเกิดจาก normalizeHeader_ ──
  stampA_json: ['stampA_json', 'stampa_json', 'stamp_a_json', 'stampajson', 'stampAjson', 'ตรารับ', 'ตำแหน่งตรารับ'],
  stampSv_json: ['stampSv_json', 'stampsv_json', 'stamp_sv_json', 'stampsvjson', 'ตราสั่งการ', 'ตำแหน่งตราสั่งการ'],
  amends_json: ['amends_json', 'คำขอแก้ไข'],
  created_by: ['created_by', 'created_by_name', 'receiver_name', 'received_by', 'ผู้รับหนังสือ', 'ผู้บันทึก', 'ผู้ลงทะเบียน', 'เจ้าหน้าที่ผู้รับ'],
  created_by_username: ['created_by_username', 'created_username', 'receiver_username', 'username_ผู้รับ'],
  created_at_iso: ['created_at_iso', 'created_at', 'สร้างเมื่อ', 'วันที่สร้าง'],
  updated_at_iso: ['updated_at_iso', 'updated_at', 'แก้ไขเมื่อ', 'วันที่แก้ไขล่าสุด']
};

/** =========================
 *  WEB APP
 * ========================= */
function doGet() {
  return HtmlService
    .createHtmlOutputFromFile(CFG.HTML_FILE)
    .setTitle('ระบบสารบรรณวิทยาลัย')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/** =========================
 *  LOGIN / USERS API
 *  ตั้งค่าผู้ใช้ได้จาก Sheet ชื่อ Users
 *  คอลัมน์หลัก: username, password, role, name, department, position, active
 *  role รองรับ: เจ้าหน้าที่, หัวหน้างาน, ผู้อำนวยการ, รองผู้อำนวยการ, ผู้บริหาร, ผู้ดูแลระบบ, งาน/แผนก
 *  หน้า Login ยังเลือกสิทธิ์เองได้ แต่ระบบจะตรวจให้ตรงกับ role/department ใน Sheet Users
 * ========================= */
function verifyLogin(payload) {
  payload = payload || {};

  const username = clean_(payload.username);
  const password = clean_(payload.password);
  const selectedRoleRaw = clean_(payload.role);
  const selectedRole = selectedRoleRaw ? normalizeUserRole_(selectedRoleRaw) : { key: '', label: '', appRole: '' };
  const selectedDepartment = normalizeUserDepartment_(payload.department);

  if (!username) throw new Error('กรุณากรอกชื่อผู้ใช้');
  if (!password) throw new Error('กรุณากรอกรหัสผ่าน');
  if (selectedRoleRaw && !selectedRole.key) throw new Error('สิทธิ์ไม่ถูกต้อง');

  const sh = getUsersSheet_();
  const users = readUsers_();
  const found = users.find(u => clean_(u.username).toLowerCase() === username.toLowerCase());

  if (!found) throw new Error('ชื่อผู้ใช้ไม่ถูกต้อง');
  if (!isActiveUser_(found.active)) throw new Error('บัญชีถูกปิดใช้งาน');
  if (clean_(found.password) !== password) throw new Error('รหัสผ่านผิด');

  const normalized = normalizeUserRole_(found.role);
  if (!normalized.key) throw new Error('สิทธิ์ไม่ถูกต้อง');

  const userAppRole = clean_(normalized.appRole || normalized.key);
  const userDepartment = normalizeUserDepartment_(normalized.department || found.department);

  if (selectedRole.key) {
    const selectedAppRole = clean_(selectedRole.appRole || selectedRole.key);

    if (selectedAppRole !== userAppRole) {
      throw new Error('สิทธิ์ไม่ถูกต้อง');
    }

    if (selectedAppRole === 'vice_director') {
      if (!selectedDepartment) throw new Error('กรุณาเลือกฝ่าย');
      if (!userDepartment) throw new Error('ฝ่ายที่เลือกไม่ถูกต้อง');
      if (selectedDepartment !== userDepartment) throw new Error('ฝ่ายที่เลือกไม่ถูกต้อง');
    }
    if (selectedAppRole === 'work_unit') {
      const selectedWorkUnit = clean_(payload.workUnit || '');
      const userWorkUnit = clean_(found.department);
      if (!selectedWorkUnit) throw new Error('กรุณาเลือกงาน/แผนก');
      if (selectedWorkUnit !== userWorkUnit) throw new Error('งาน/แผนกที่เลือกไม่ถูกต้อง');
    }
  }

  const nowIso = new Date().toISOString();
  try {
    updateUserLastLogin_(sh, found.rowIndex, nowIso);
  } catch (err) { }

  return {
    ok: true,
    username: clean_(found.username),
    name: clean_(found.name) || clean_(found.username),
    role: userAppRole,
    roleKey: normalized.key,
    roleLabel: normalized.label,
    department: userDepartment || clean_(found.department),
    workUnit: userAppRole === 'work_unit' ? clean_(found.department) : '',
    position: clean_(found.position) || normalized.label,
    initials: makeInitials_(clean_(found.name) || clean_(found.username)),
    logged_in_at_iso: nowIso
  };
}

function getUsersSheet_() {
  const ss = openSpreadsheet_();
  let sh = ss.getSheetByName(USER_CFG.SHEET_NAME);
  if (!sh) sh = ss.insertSheet(USER_CFG.SHEET_NAME);
  ensureUsersSheet_(sh);
  return sh;
}

function ensureUsersSheet_(sh) {
  // สำคัญ: ฟังก์ชันนี้ถูกเรียกทุกครั้งที่ Login
  // ดังนั้นห้ามเติม DEFAULT_USERS ซ้ำเมื่อ Sheet มีบัญชีอยู่แล้ว
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, USER_CFG.HEADERS.length).setValues([USER_CFG.HEADERS]);
    sh.setFrozenRows(1);
    seedDefaultUsers_(sh);
    return;
  }

  const lastCol = Math.max(sh.getLastColumn(), USER_CFG.HEADERS.length);
  const firstRow = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(v => clean_(v));
  const hasHeader = firstRow.some(v => v !== '');

  if (!hasHeader) {
    sh.getRange(1, 1, 1, USER_CFG.HEADERS.length).setValues([USER_CFG.HEADERS]);
    sh.setFrozenRows(1);
    seedDefaultUsers_(sh);
    return;
  }

  const normalized = firstRow.map(normalizeUserHeader_);
  const missing = USER_CFG.HEADERS.filter(h => !normalized.includes(h));
  if (missing.length) {
    const oldLastCol = Math.max(sh.getLastColumn(), 1);
    sh.insertColumnsAfter(oldLastCol, missing.length);
    sh.getRange(1, oldLastCol + 1, 1, missing.length).setValues([missing]);
  }

  sh.setFrozenRows(1);

  // สร้างบัญชีเริ่มต้นเฉพาะตอน Sheet มีแค่หัวตารางเท่านั้น
  // ถ้ามีข้อมูลผู้ใช้อยู่แล้ว ให้ Login อ่าน/ตรวจสอบอย่างเดียว ไม่ append user ใหม่
  if (sh.getLastRow() <= 1) {
    seedDefaultUsers_(sh);
  }
}

function defaultUserRow_(row, nowIso) {
  return [row[0], secret_('DEFAULT_PASSWORD'), row[1], row[2], row[3], row[4], row[5], nowIso, nowIso];
}

function seedDefaultUsers_(sh) {
  const nowIso = new Date().toISOString();
  const rows = USER_CFG.DEFAULT_USERS.map(row => defaultUserRow_(row, nowIso));
  if (rows.length) {
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, USER_CFG.HEADERS.length).setValues(rows);
  }
}

function seedMissingDefaultUsers_(sh) {
  const users = readUsersRaw_(sh);
  const existing = new Set(users.map(u => clean_(u.username).toLowerCase()).filter(Boolean));
  const nowIso = new Date().toISOString();
  const rows = USER_CFG.DEFAULT_USERS
    .filter(row => !existing.has(clean_(row[0]).toLowerCase()))
    .map(row => defaultUserRow_(row, nowIso));

  if (rows.length) {
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, USER_CFG.HEADERS.length).setValues(rows);
  }
}

/**
 * ใช้เฉพาะกรณีต้องการเติมบัญชีเริ่มต้นที่ยังไม่มีด้วยตัวเอง
 * วิธีใช้: เปิด Apps Script แล้ว Run ฟังก์ชันนี้ 1 ครั้ง
 * ฟังก์ชัน Login ปกติจะไม่เรียกตัวนี้ เพื่อป้องกันการสร้าง username ซ้ำ
 */
function setupMissingDefaultUsersOnce() {
  const ss = openSpreadsheet_();
  let sh = ss.getSheetByName(USER_CFG.SHEET_NAME);
  if (!sh) sh = ss.insertSheet(USER_CFG.SHEET_NAME);
  ensureUsersSheet_(sh);
  seedMissingDefaultUsers_(sh);
  return { ok: true, message: 'เติมบัญชีเริ่มต้นที่ยังไม่มีเรียบร้อยแล้ว' };
}

function readUsersRaw_(sh) {
  const lastRow = sh.getLastRow();
  if (lastRow <= 1) return [];

  const lastCol = Math.max(sh.getLastColumn(), USER_CFG.HEADERS.length);
  const values = sh.getRange(1, 1, lastRow, lastCol).getValues();
  const headers = values[0].map(normalizeUserHeader_);

  return values.slice(1)
    .map((row, idx) => {
      const obj = { rowIndex: idx + 2 };
      USER_CFG.HEADERS.forEach(key => {
        const col = headers.indexOf(key);
        obj[key] = col >= 0 ? row[col] : '';
      });
      return obj;
    })
    .filter(u => clean_(u.username) !== '');
}

function readUsers_() {
  return readUsersRaw_(getUsersSheet_());
}

function updateUserLastLogin_(sh, rowIndex, nowIso) {
  const headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), USER_CFG.HEADERS.length)).getValues()[0].map(normalizeUserHeader_);
  const col = headers.indexOf('updated_at_iso') + 1;
  if (col <= 0) return;
  sh.getRange(rowIndex, col).setValue(nowIso);
}

function normalizeUserHeader_(value) {
  const h = clean_(value).toLowerCase().replace(/\s+/g, '_');
  const map = {
    user: 'username',
    users: 'username',
    login: 'username',
    login_name: 'username',
    account: 'username',
    'ชื่อผู้ใช้': 'username',
    pass: 'password',
    pwd: 'password',
    'รหัสผ่าน': 'password',
    permission: 'role',
    permissions: 'role',
    right: 'role',
    rights: 'role',
    user_role: 'role',
    'สิทธิ์': 'role',
    'สิทธิ': 'role',
    'บทบาท': 'role',
    fullname: 'name',
    full_name: 'name',
    display_name: 'name',
    'ชื่อ': 'name',
    'ชื่อ_นามสกุล': 'name',
    dept: 'department',
    'ฝ่าย': 'department',
    'แผนก': 'department',
    pos: 'position',
    'ตำแหน่ง': 'position',
    enabled: 'active',
    status: 'active',
    'สถานะ': 'active',
    created_at: 'created_at_iso',
    updated_at: 'updated_at_iso'
  };
  return map[h] || h;
}

function normalizeUserRole_(roleValue) {
  const raw = clean_(roleValue);
  const r = raw.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');

  const deputyRoles = [
    {
      key: 'vice_director_resource',
      label: 'รองผู้อำนวยการฝ่ายบริหารทรัพยากร',
      department: 'ฝ่ายบริหารทรัพยากร',
      aliases: ['รองผู้อำนวยการฝ่ายบริหารทรัพยากร', 'รองฝ่ายบริหารทรัพยากร', 'deputyresource', 'viceresource']
    },
    {
      key: 'vice_director_academic',
      label: 'รองผู้อำนวยการฝ่ายวิชาการ',
      department: 'ฝ่ายวิชาการ',
      aliases: ['รองผู้อำนวยการฝ่ายวิชาการ', 'รองฝ่ายวิชาการ', 'รองผู้อำนวยการฝ่ายบริหารงานวิชาการ', 'รองฝ่ายบริหารงานวิชาการ', 'deputyacademic', 'viceacademic']
    },
    {
      key: 'vice_director_student',
      label: 'รองผู้อำนวยการฝ่ายกิจการนักเรียน นักศึกษา',
      department: 'ฝ่ายกิจการนักเรียน นักศึกษา',
      aliases: ['รองผู้อำนวยการฝ่ายกิจการนักเรียน นักศึกษา', 'รองฝ่ายกิจการนักเรียน นักศึกษา', 'รองผู้อำนวยการฝ่ายพัฒนากิจการนักเรียนนักศึกษา', 'รองผู้อำนวยการฝ่ายพัฒนากิจการนักเรียน นักศึกษา', 'รองผู้อำนวยการฝ่ายพัฒนากิจการนักเรียน', 'รองฝ่ายพัฒนากิจการนักเรียนนักศึกษา', 'รองฝ่ายพัฒนากิจการนักเรียน นักศึกษา', 'รองฝ่ายพัฒนากิจการนักเรียน', 'deputystudent', 'vicestudent']
    },
    {
      key: 'vice_director_plan',
      label: 'รองผู้อำนวยการฝ่ายยุทธศาสตร์และแผนงาน',
      department: 'ฝ่ายยุทธศาสตร์และแผนงาน',
      aliases: ['รองผู้อำนวยการฝ่ายยุทธศาสตร์และแผนงาน', 'รองฝ่ายยุทธศาสตร์และแผนงาน', 'รองผู้อำนวยการฝ่ายแผนงานและความร่วมมือ', 'รองฝ่ายแผนงานและความร่วมมือ', 'deputyplan', 'viceplan']
    }
  ];

  for (let i = 0; i < deputyRoles.length; i++) {
    const item = deputyRoles[i];
    if (item.aliases.map(a => String(a).toLowerCase().replace(/\s+/g, '').replace(/_/g, '')).includes(r)) {
      return { key: item.key, label: item.label, appRole: 'vice_director', department: item.department };
    }
  }

  if (['เจ้าหน้าที่', 'เจ้าหน้าที่สารบรรณ', 'เจ้าหน้าที่สารบรรณกลาง', 'staff', 'officer', 'user', 'adminrole'].includes(r) || raw === 'admin') {
    return { key: 'admin', label: 'เจ้าหน้าที่', appRole: 'admin' };
  }
  if (['หัวหน้างาน', 'หัวหน้างานสารบรรณ', 'supervisor', 'head', 'chief'].includes(r)) {
    return { key: 'supervisor', label: 'หัวหน้างาน', appRole: 'supervisor' };
  }
  if (['ผู้อำนวยการ', 'ผู้อำนวยการวิทยาลัย', 'director', 'collegedirector'].includes(r)) {
    return { key: 'director', label: 'ผู้อำนวยการ', appRole: 'director' };
  }
  if (['รองผู้อำนวยการ', 'รองผู้อำนวยการวิทยาลัย', 'deputydirector', 'vice_director', 'vicedirector', 'deputy'].includes(r)) {
    return { key: 'vice_director', label: 'รองผู้อำนวยการ', appRole: 'vice_director' };
  }
  if (['ผู้บริหาร', 'executive', 'manager'].includes(r)) {
    return { key: 'executive', label: 'ผู้บริหาร', appRole: 'executive' };
  }
  if (['ผู้ดูแลระบบ', 'ดูแลระบบ', 'systemadmin', 'sysadmin', 'superadmin', 'administrator'].includes(r)) {
    return { key: 'sysadmin', label: 'ผู้ดูแลระบบ', appRole: 'sysadmin' };
  }
  if (['งาน/แผนก', 'งานแผนก', 'work_unit', 'workunit', 'work', 'งาน', 'แผนก'].includes(r)) {
    return { key: 'work_unit', label: 'งาน/แผนก', appRole: 'work_unit' };
  }

  return { key: '', label: raw, appRole: '' };
}

function normalizeUserDepartment_(value) {
  const raw = clean_(value);
  const r = raw.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
  if (!r) return '';

  if (['ฝ่ายบริหารทรัพยากร', 'บริหารทรัพยากร', 'resource', 'resources'].includes(r)) return 'ฝ่ายบริหารทรัพยากร';
  if (['ฝ่ายวิชาการ', 'วิชาการ', 'ฝ่ายบริหารงานวิชาการ', 'บริหารงานวิชาการ', 'academic'].includes(r)) return 'ฝ่ายวิชาการ';
  if (['ฝ่ายกิจการนักเรียนนักศึกษา', 'ฝ่ายกิจการนักเรียน นักศึกษา', 'กิจการนักเรียนนักศึกษา', 'กิจการนักเรียน', 'ฝ่ายพัฒนากิจการนักเรียนนักศึกษา', 'ฝ่ายพัฒนากิจการนักเรียน นักศึกษา', 'ฝ่ายพัฒนากิจการนักเรียน', 'พัฒนากิจการนักเรียนนักศึกษา', 'พัฒนากิจการนักเรียน', 'studentaffairs'].includes(r)) return 'ฝ่ายกิจการนักเรียน นักศึกษา';
  if (['ฝ่ายยุทธศาสตร์และแผนงาน', 'ยุทธศาสตร์และแผนงาน', 'ฝ่ายแผนงานและความร่วมมือ', 'แผนงานและความร่วมมือ', 'แผนงาน', 'plan', 'planning'].includes(r)) return 'ฝ่ายยุทธศาสตร์และแผนงาน';

  return raw;
}

function isActiveUser_(value) {
  const v = clean_(value).toLowerCase();
  if (value === true) return true;
  if (value === false) return false;
  if (!v) return true;
  return !['false', '0', 'no', 'n', 'inactive', 'disabled', 'ปิด', 'ปิดใช้งาน', 'ไม่ใช้งาน'].includes(v);
}

function makeInitials_(name) {
  const s = clean_(name);
  if (!s) return 'U';
  const parts = s.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return clean_(parts[0]).charAt(0) + clean_(parts[1]).charAt(0);
  return s.slice(0, 2);
}


function buildUserDisplayDirectory_() {
  const users = readUsers_()
    .filter(u => isActiveUser_(u.active))
    .map(u => {
      const nr = normalizeUserRole_(u.role);
      const appRole = clean_(nr.appRole || nr.key);
      const dept = normalizeUserDepartment_(nr.department || u.department);
      return {
        username: clean_(u.username),
        name: clean_(u.name) || clean_(u.username),
        role: appRole,
        department: dept,
        position: clean_(u.position) || clean_(nr.label)
      };
    })
    .filter(u => u.username || u.name);

  function findUser(appRole, deptName) {
    const role = clean_(appRole);
    const dept = normalizeUserDepartment_(deptName);
    let found = users.find(u => u.role === role && (!dept || u.department === dept));
    if (!found && dept) found = users.find(u => u.role === role && !u.department);
    if (!found) found = users.find(u => u.role === role);
    return found || null;
  }

  return {
    users: users,
    nameFor: function (appRole, deptName) {
      const user = findUser(appRole, deptName);
      return user ? clean_(user.name || user.username) : '';
    },
    usernameFor: function (appRole, deptName) {
      const user = findUser(appRole, deptName);
      return user ? clean_(user.username) : '';
    }
  };
}

function shouldReplaceLegacyPersonName_(name, appRole) {
  const n = clean_(name);
  if (!n) return true;
  const compact = n.toLowerCase().replace(/\s+/g, '');
  const generic = [
    'สมใจกลางวิทย์',
    'นายวิชัยทรัพย์ดี',
    'เจ้าหน้าที่สารบรรณกลาง',
    'เจ้าหน้าที่สารบรรณ',
    'หัวหน้างานสารบรรณ',
    'หัวหน้าสารบรรณ',
    'รองผู้อำนวยการ',
    'ผู้อำนวยการ',
    'ผู้บริหาร',
    'ผู้ดูแลระบบ',
    'admin',
    'staff',
    'supervisor',
    'director',
    'vice_director'
  ];
  if (generic.includes(compact)) return true;
  if (appRole === 'vice_director' && (compact.indexOf('รองผู้อำนวยการฝ่าย') === 0 || compact.indexOf('รองฝ่าย') === 0)) return true;
  return false;
}

function repairLegacyUserNamesForDocs_(sh, docs) {
  if (!docs || !docs.length) return { changed: 0 };

  let directory;
  try {
    directory = buildUserDisplayDirectory_();
  } catch (err) {
    return { changed: 0, error: clean_(err && err.message) };
  }

  const centralName = directory.nameFor('admin', '') || directory.nameFor('sysadmin', '');
  const centralUsername = directory.usernameFor('admin', '') || directory.usernameFor('sysadmin', '');
  const directorName = directory.nameFor('director', '');
  let changedCount = 0;

  (docs || []).forEach(doc => {
    if (!doc || !doc.rowIndex) return;
    const fields = {};

    if (centralName && shouldReplaceLegacyPersonName_(doc.created_by, 'admin')) {
      doc.created_by = centralName;
      fields.created_by = centralName;
    }
    if (centralUsername && shouldReplaceLegacyPersonName_(doc.created_by_username, 'admin')) {
      doc.created_by_username = centralUsername;
      fields.created_by_username = centralUsername;
    }

    const dst = parseJson_(doc.dst_json, {});
    let dstChanged = false;

    Object.keys(dst || {}).forEach(key => {
      if (key === '__directorCommand') return;
      const state = dst[key];
      if (!state || typeof state !== 'object') return;
      const deptName = normalizeUserDepartment_(key || state.department);

      const deputyUserName = directory.nameFor('vice_director', deptName);
      const hasDeputyAction = !!(state.subSorted || state.subAutoSortedByUpload || (Array.isArray(state.subTargets) && state.subTargets.length));
      if (deputyUserName && hasDeputyAction && shouldReplaceLegacyPersonName_(state.subSortedBy, 'vice_director')) {
        state.subSortedBy = deputyUserName;
        dstChanged = true;
      }
    });

    if (dst && dst.__directorCommand && typeof dst.__directorCommand === 'object') {
      const dc = dst.__directorCommand;
      if (directorName && (dc.done || dc.note || dc.at) && shouldReplaceLegacyPersonName_(dc.by, 'director')) {
        dc.by = directorName;
        dstChanged = true;
      }
    }

    if (dstChanged) {
      doc.dst_json = jsonStringifySafe_(dst, {});
      fields.dst_json = doc.dst_json;
    }

    if (Object.keys(fields).length) {
      try {
        updateFieldsAtRow_(sh, doc.rowIndex, fields);
        changedCount++;
      } catch (err) { }
    }
  });

  return { changed: changedCount };
}

function repairLegacyDocumentUserNames() {
  const sh = getSheet_();
  const lastRow = sh.getLastRow();
  if (lastRow <= 1) return { ok: true, changed: 0 };

  const lastCol = Math.max(sh.getLastColumn(), HEADERS.length);
  const range = sh.getRange(1, 1, lastRow, lastCol);
  const values = range.getValues();
  const richValues = range.getRichTextValues();
  const headers = sanitizeHeaderRow_(values[0]);

  const docs = values.slice(1)
    .map((row, index) => ({ row: row, richRow: richValues[index + 1] || [], rowIndex: index + 2 }))
    .filter(item => item.row.some(v => clean_(v) !== ''))
    .map(item => rowToCanonicalObject_(headers, item.row, item.rowIndex, item.richRow));

  const result = repairLegacyUserNamesForDocs_(sh, docs);
  return { ok: true, changed: result.changed || 0 };
}

/** =========================
 *  READ API
 * ========================= */
function getIncomingDocs() {
  const sh = getSheet_();
  const lastRow = sh.getLastRow();
  if (lastRow <= 1) return [];

  const lastCol = Math.max(sh.getLastColumn(), HEADERS.length);
  const range = sh.getRange(1, 1, lastRow, lastCol);
  const values = range.getValues();
  const richValues = range.getRichTextValues();
  const headers = sanitizeHeaderRow_(values[0]);

  const docs = values.slice(1)
    .map((row, index) => ({ row: row, richRow: richValues[index + 1] || [], rowIndex: index + 2 }))
    .filter(item => item.row.some(v => clean_(v) !== ''))
    .map(item => rowToCanonicalObject_(headers, item.row, item.rowIndex, item.richRow));

  enrichDriveMetaForDocs_(docs);
  repairLegacyUserNamesForDocs_(sh, docs);

  return docs
    .map(mapRowToClient_)
    .sort((a, b) => String(b.created_at_iso || b.updated_at_iso || b.ra || '').localeCompare(String(a.created_at_iso || a.updated_at_iso || a.ra || '')));
}

function getDriveFileAsBase64(fileId) {
  const id = clean_(extractDriveId_(fileId) || fileId);
  if (!id) throw new Error('ไม่พบ fileId');

  const file = DriveApp.getFileById(id);
  const blob = file.getBlob();
  const bytes = blob.getBytes();

  return {
    fileId: file.getId(),
    name: file.getName(),
    mimeType: blob.getContentType(),
    size: bytes.length,
    base64: Utilities.base64Encode(bytes)
  };
}

function getDriveFileMeta(fileId) {
  const id = clean_(extractDriveId_(fileId) || fileId);
  if (!id) throw new Error('ไม่พบ fileId');

  const file = DriveApp.getFileById(id);
  const blob = file.getBlob();

  return {
    fileId: file.getId(),
    name: file.getName(),
    mimeType: blob.getContentType(),
    size: safeDriveFileSize_(file, blob),
    url: file.getUrl()
  };
}

function enrichDriveMetaForDocs_(docs) {
  (docs || []).forEach(doc => {
    if (!doc) return;

    const fileId = clean_(doc.drive_file_id || extractDriveId_(doc.drive_file_url) || extractDriveId_(doc.file_name));
    if (!fileId) {
      doc.drive_file_id = '';
      return;
    }

    doc.drive_file_id = fileId;

    const needsMeta = !clean_(doc.file_name) || !clean_(doc.file_mime) || !Number(doc.file_size || 0) || !clean_(doc.drive_file_url);
    if (!needsMeta) return;

    try {
      const file = DriveApp.getFileById(fileId);
      const blob = file.getBlob();
      doc.file_name = clean_(doc.file_name) || file.getName();
      doc.file_mime = clean_(doc.file_mime) || blob.getContentType();
      doc.file_size = Number(doc.file_size || 0) || safeDriveFileSize_(file, blob);
      doc.drive_file_url = clean_(doc.drive_file_url) || file.getUrl();
    } catch (err) {
      doc.file_name = clean_(doc.file_name) || 'ไฟล์แนบ';
    }
  });
}

function safeDriveFileSize_(file, blob) {
  try {
    if (file && typeof file.getSize === 'function') return Number(file.getSize() || 0);
  } catch (err) { }
  try {
    if (blob) return Number(blob.getBytes().length || 0);
  } catch (err) { }
  return 0;
}

function getNextRunningNumber() {
  const sh = getSheet_();
  const values = sh.getDataRange().getValues();
  const yy = String((new Date().getFullYear() + 543)).slice(-2);

  if (values.length <= 1) {
    return 'รบ.' + yy + '-001';
  }

  const headers = sanitizeHeaderRow_(values[0]);
  let maxSeq = 0;

  values.slice(1).forEach((row, index) => {
    const obj = rowToCanonicalObject_(headers, row, index + 2);
    const rn = clean_(obj.rn);
    const m = rn.match(/^รบ\.(\d{2})-(\d+)$/);
    if (!m) return;
    if (m[1] !== yy) return;
    maxSeq = Math.max(maxSeq, Number(m[2] || 0));
  });

  return 'รบ.' + yy + '-' + String(maxSeq + 1).padStart(3, '0');
}

/** =========================
 *  CREATE / EDIT API
 * ========================= */
function saveIncomingDoc(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('ไม่พบข้อมูลที่ต้องการบันทึก');
  }

  const rn = clean_(payload.rn);
  const dn = clean_(payload.dn);
  const title = clean_(payload.title);

  if (!rn) throw new Error('กรุณากรอกเลขรับหนังสือ');
  if (!title) throw new Error('กรุณากรอกชื่อเรื่อง');

  const sh = getSheet_();
  const now = new Date();
  const nowIso = now.toISOString();
  const id = clean_(payload.id);

  if (id) {
    const found = findRowById_(sh, id);
    if (!found) throw new Error('ไม่พบรายการที่ต้องการแก้ไข');

    if (clean_(found.assignedId || id) !== clean_(id)) {
      updateFieldsAtRow_(sh, found.rowIndex, { id: clean_(found.assignedId || id) });
    } else if (found.needsPersistId) {
      updateFieldsAtRow_(sh, found.rowIndex, { id: clean_(found.assignedId || id) });
    }

    const existing = readRowObjectAt_(sh, found.rowIndex);
    const uploaded = payload.file && payload.file.base64 ? saveUploadFile_(payload.file) : null;

    const record = {
      ...existing,
      id: id,
      rn: rn,
      dn: dn,
      dd: clean_(payload.dd),
      title: title,
      fr: clean_(payload.fr),
      to: clean_(payload.to),
      src: clean_(payload.src),
      urgency: clean_(payload.urgency),
      file_name: uploaded ? uploaded.fileName : clean_(existing.file_name),
      file_mime: uploaded ? uploaded.mimeType : clean_(existing.file_mime),
      file_size: uploaded ? uploaded.fileSize : Number(existing.file_size || 0),
      drive_file_id: uploaded ? uploaded.fileId : clean_(existing.drive_file_id),
      drive_file_url: uploaded ? uploaded.fileUrl : clean_(existing.drive_file_url),
      created_by: clean_(existing.created_by) || clean_(payload.created_by || payload.by || ''),
      created_by_username: clean_(existing.created_by_username) || clean_(payload.created_by_username || payload.username || ''),
      updated_at_iso: nowIso
    };

    writeRecordAtRow_(sh, found.rowIndex, record);

    return {
      ok: true,
      message: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
      item: mapRowToClient_(record)
    };
  }

  const uploaded = saveUploadFile_(payload.file);
  const record = {
    id: Utilities.getUuid(),
    rn: rn,
    ra: formatThaiDateTime_(now),
    dn: dn,
    dd: clean_(payload.dd),
    title: title,
    fr: clean_(payload.fr),
    to: clean_(payload.to),
    src: clean_(payload.src),
    urgency: clean_(payload.urgency),
    file_name: uploaded.fileName,
    file_mime: uploaded.mimeType,
    file_size: uploaded.fileSize,
    drive_file_id: uploaded.fileId,
    drive_file_url: uploaded.fileUrl,
    sorted: false,
    sd_json: json_([]),
    sn: '',
    sby: '',
    spos: '',
    sa: '',
    dst_json: json_({}),
    stampA_json: json_({ x: 75, y: 5 }),
    stampSv_json: json_({ x: 5, y: 70 }),
    amends_json: json_([]),
    created_by: clean_(payload.created_by || payload.by || ''),
    created_by_username: clean_(payload.created_by_username || payload.username || ''),
    created_at_iso: nowIso,
    updated_at_iso: nowIso,
    replyDue: clean_(payload.replyDue || '')
  };

  appendRow_(sh, record);

  return {
    ok: true,
    message: 'บันทึกข้อมูลเรียบร้อยแล้ว',
    item: mapRowToClient_(record)
  };
}

function deleteIncomingDoc(payload) {
  payload = payload || {};

  const id = clean_(payload.id);
  if (!id) throw new Error('ไม่พบรหัสรายการหนังสือที่ต้องการลบ');

  const roleRaw = clean_(payload.role || payload.appRole || '');
  const normalized = normalizeUserRole_(roleRaw);
  const appRole = clean_(normalized.appRole || normalized.key || roleRaw);

  const allowed =
    appRole === 'admin' ||
    appRole === 'sysadmin' ||
    appRole === 'supervisor' ||
    roleRaw === 'เจ้าหน้าที่' ||
    roleRaw === 'เจ้าหน้าที่สารบรรณ' ||
    roleRaw === 'เจ้าหน้าที่สารบรรณกลาง' ||
    roleRaw === 'หัวหน้างาน' ||
    roleRaw === 'หัวหน้างานสารบรรณ' ||
    roleRaw === 'หัวหน้าสารบรรณ' ||
    roleRaw === 'ผู้ดูแลระบบ';

  if (!allowed) {
    throw new Error('สิทธิ์นี้ไม่สามารถลบรายการหนังสือได้');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    const sh = getSheet_();
    const found = findRowById_(sh, id);
    if (!found) throw new Error('ไม่พบรายการหนังสือที่ต้องการลบ');

    const record = readRowObjectAt_(sh, found.rowIndex);
    const fileIds = collectDriveFileIdsForDelete_(record);

    const fileResults = fileIds.map(function (fileId) {
      try {
        const file = DriveApp.getFileById(fileId);
        file.setTrashed(true);
        return {
          fileId: fileId,
          ok: true,
          message: 'ย้ายไฟล์ไปถังขยะแล้ว'
        };
      } catch (err) {
        return {
          fileId: fileId,
          ok: false,
          message: clean_(err && err.message) || 'ย้ายไฟล์ไปถังขยะไม่สำเร็จ'
        };
      }
    });

    sh.deleteRow(found.rowIndex);

    const failed = fileResults.filter(function (item) {
      return !item.ok;
    });

    return {
      ok: true,
      deletedId: id,
      deletedRow: found.rowIndex,
      fileIds: fileIds,
      fileResults: fileResults,
      message: failed.length
        ? 'ลบรายการใน Sheet แล้ว แต่มีบางไฟล์ใน Drive ที่ย้ายไปถังขยะไม่สำเร็จ'
        : 'ลบรายการหนังสือและย้ายไฟล์ใน Drive ไปถังขยะเรียบร้อยแล้ว'
    };
  } finally {
    try {
      lock.releaseLock();
    } catch (err) { }
  }
}

function collectDriveFileIdsForDelete_(record) {
  const ids = [];

  function add(value) {
    const text = clean_(value);
    if (!text) return;

    const id = clean_(extractDriveId_(text) || text);
    if (!id) return;
    if (ids.indexOf(id) === -1) ids.push(id);
  }

  add(record.drive_file_id);
  add(record.drive_file_url);

  [
    record.files_json,
    record.attachments_json,
    record.dst_json,
    record.amends_json
  ].forEach(function (value) {
    const parsed = parseJson_(value, null);
    collectDriveIdsFromAnyValue_(parsed, ids);
  });

  return ids;
}

function collectDriveIdsFromAnyValue_(value, ids) {
  if (!value) return;

  if (typeof value === 'string') {
    const id = clean_(extractDriveId_(value) || '');
    if (id && ids.indexOf(id) === -1) ids.push(id);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach(function (item) {
      collectDriveIdsFromAnyValue_(item, ids);
    });
    return;
  }

  if (typeof value === 'object') {
    [
      'fileId',
      'file_id',
      'driveFileId',
      'drive_file_id',
      'replacementFileId',
      'replacement_file_id',
      'uploadFileId',
      'uploadedFileId',
      'url',
      'fileUrl',
      'driveFileUrl',
      'drive_file_url'
    ].forEach(function (key) {
      if (value[key]) collectDriveIdsFromAnyValue_(value[key], ids);
    });

    Object.keys(value).forEach(function (key) {
      if (key === 'base64') return;
      if (typeof value[key] === 'object') {
        collectDriveIdsFromAnyValue_(value[key], ids);
      }
    });
  }
}


function replaceIncomingDocFile(payload) {
  // ฟีเจอร์อัพโหลดไฟล์ทับโดยสารบรรณประจำฝ่ายถูกตัดออกพร้อม flow dept แล้ว
  // เก็บฟังก์ชันไว้เพื่อป้องกัน error กรณี frontend เก่าเรียกใช้
  throw new Error('ฟีเจอร์นี้ถูกยกเลิกแล้ว');
}

function updateIncomingDocState(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('ไม่พบข้อมูลสำหรับอัปเดต');
  }

  const id = clean_(payload.id);
  if (!id) throw new Error('ไม่พบรหัสเอกสาร');

  const sh = getSheet_();
  const found = findRowById_(sh, id);
  if (!found) throw new Error('ไม่พบรายการที่ต้องการอัปเดต');

  const rowId = clean_(found.assignedId || id);

  // ── FIX: ใช้ key ตรงตาม HEADERS array ──
  updateFieldsAtRow_(sh, found.rowIndex, {
    id: rowId,
    sorted: payload.sorted === true || payload.sorted === 'true',
    sd_json: jsonStringifySafe_(Array.isArray(payload.sd) ? payload.sd : [], []),
    sn: clean_(payload.sn),
    sby: clean_(payload.sby),
    spos: clean_(payload.spos),
    sa: clean_(payload.sa),
    dst_json: jsonStringifySafe_(payload.dst || {}, {}),
    'stampA_json': jsonStringifySafe_(payload.stampA || { x: 75, y: 5 }, { x: 75, y: 5 }),
    'stampSv_json': jsonStringifySafe_(payload.stampSv || { x: 5, y: 70 }, { x: 5, y: 70 }),
    amends_json: jsonStringifySafe_(Array.isArray(payload.amends) ? payload.amends : [], []),
    updated_at_iso: new Date().toISOString()
  });

  const updated = readRowObjectAt_(sh, found.rowIndex);
  if (!clean_(updated.id)) {
    updated.id = rowId;
  }

  return {
    ok: true,
    message: 'อัปเดตข้อมูลเรียบร้อยแล้ว',
    item: mapRowToClient_(updated)
  };
}


function updateDocStampPositions(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('ไม่พบข้อมูลตำแหน่งที่ต้องการบันทึก');
  }

  const id = clean_(payload.id);
  if (!id) throw new Error('ไม่พบรหัสเอกสาร');

  const sh = getSheet_();
  const found = findRowById_(sh, id);
  if (!found) throw new Error('ไม่พบรายการที่ต้องการอัปเดต');

  const rowId = clean_(found.assignedId || id);

  // ── FIX: ใช้ key ตรงตาม HEADERS array ──
  updateFieldsAtRow_(sh, found.rowIndex, {
    id: rowId,
    'stampA_json': jsonStringifySafe_(payload.stampA || { x: 75, y: 5, abs: false }, { x: 75, y: 5, abs: false }),
    'stampSv_json': jsonStringifySafe_(payload.stampSv || { x: 5, y: 70, abs: false }, { x: 5, y: 70, abs: false }),
    updated_at_iso: new Date().toISOString()
  });

  const updated = readRowObjectAt_(sh, found.rowIndex);
  if (!clean_(updated.id)) {
    updated.id = rowId;
  }

  return {
    ok: true,
    message: 'บันทึกตำแหน่งดราฟเรียบร้อยแล้ว',
    item: mapRowToClient_(updated)
  };
}

/** =========================
 *  DRIVE FILE SAVE
 * ========================= */
function saveUploadFile_(fileObj) {
  if (!fileObj || !fileObj.base64) {
    return {
      fileId: '',
      fileName: '',
      fileUrl: '',
      mimeType: '',
      fileSize: 0
    };
  }

  const mimeType = clean_(fileObj.mimeType) || 'application/pdf';
  const fileName = clean_(fileObj.name) || defaultFileName_(mimeType);

  const allowed = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  if (!allowed.includes(mimeType)) {
    throw new Error('รองรับเฉพาะ PDF, JPG, JPEG, PNG');
  }

  let bytes;
  try {
    bytes = Utilities.base64Decode(fileObj.base64);
  } catch (err) {
    throw new Error('ข้อมูลไฟล์ไม่ถูกต้อง (base64 decode ไม่สำเร็จ)');
  }

  if (!bytes || !bytes.length) {
    throw new Error('ไม่พบข้อมูลไฟล์');
  }

  const folder = DriveApp.getFolderById(secret_('UPLOAD_FOLDER_ID'));
  const blob = Utilities.newBlob(bytes, mimeType, fileName);
  const file = folder.createFile(blob);

  return {
    fileId: file.getId(),
    fileName: file.getName(),
    fileUrl: file.getUrl(),
    mimeType: mimeType,
    fileSize: bytes.length
  };
}

/** =========================
 *  SHEET HELPERS
 * ========================= */
function getSheet_() {
  const ss = openSpreadsheet_();
  const sh = ss.getSheetByName(CFG.SHEET_NAME) || ss.insertSheet(CFG.SHEET_NAME);
  ensureHeaders_(sh);
  return sh;
}

function ensureHeaders_(sh) {
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sh.setFrozenRows(1);
    return;
  }

  const lastRow = sh.getLastRow();
  const lastCol = Math.max(sh.getLastColumn(), HEADERS.length);
  const range = sh.getRange(1, 1, lastRow, lastCol);
  const values = range.getValues();
  const richValues = range.getRichTextValues();
  const currentHeaders = sanitizeHeaderRow_(values[0]);
  const isCanonical = HEADERS.every((h, i) => currentHeaders[i] === h);

  if (isCanonical) {
    if (sh.getLastColumn() < HEADERS.length) {
      sh.insertColumnsAfter(sh.getLastColumn(), HEADERS.length - sh.getLastColumn());
      sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    }
    sh.setFrozenRows(1);
    return;
  }

  const dataRows = values.slice(1)
    .map((row, index) => ({ row: row, richRow: richValues[index + 1] || [], rowIndex: index + 2 }))
    .filter(item => item.row.some(v => clean_(v) !== ''));

  const migratedRows = dataRows.map(item => {
    const record = rowToCanonicalObject_(currentHeaders, item.row, item.rowIndex, item.richRow);
    return HEADERS.map(h => record[h] !== undefined ? record[h] : '');
  });

  if (sh.getMaxColumns() < HEADERS.length) {
    sh.insertColumnsAfter(sh.getMaxColumns(), HEADERS.length - sh.getMaxColumns());
  }

  sh.clearContents();
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  if (migratedRows.length) {
    sh.getRange(2, 1, migratedRows.length, HEADERS.length).setValues(migratedRows);
  }
  sh.setFrozenRows(1);
}

function appendRow_(sh, record) {
  const row = HEADERS.map(h => record[h] !== undefined ? record[h] : '');
  sh.appendRow(row);
}

function writeRecordAtRow_(sh, rowIndex, record) {
  const row = HEADERS.map(h => record[h] !== undefined ? record[h] : '');
  sh.getRange(rowIndex, 1, 1, HEADERS.length).setValues([row]);
}

function updateFieldsAtRow_(sh, rowIndex, fields) {
  Object.keys(fields || {}).forEach(key => {
    // ── FIX: หา column index จาก HEADERS array โดยตรง (case-sensitive) ก่อน
    //         แล้ว fallback ไป normalized match ──
    let colIndex = HEADERS.indexOf(key);
    if (colIndex === -1) {
      // fallback: normalized match
      const normalizedKey = normalizeHeader_(key);
      colIndex = HEADERS.findIndex(h => normalizeHeader_(h) === normalizedKey);
    }
    if (colIndex === -1) return;
    sh.getRange(rowIndex, colIndex + 1).setValue(fields[key]);
  });
}

function findRowById_(sh, id) {
  const targetId = clean_(id);
  if (!targetId) return null;

  const lastRow = sh.getLastRow();
  if (lastRow <= 1) return null;

  const lastCol = Math.max(sh.getLastColumn(), HEADERS.length);
  const range = sh.getRange(1, 1, lastRow, lastCol);
  const values = range.getValues();
  const richValues = range.getRichTextValues();
  const headers = sanitizeHeaderRow_(values[0]);
  const idIndex = headers.indexOf('id');

  for (let i = 1; i < values.length; i++) {
    const rowIndex = i + 1;
    const actualId = idIndex >= 0 ? clean_(values[i][idIndex]) : '';
    if (actualId && actualId === targetId) {
      return {
        rowIndex: rowIndex,
        matchedBy: 'id',
        actualId: actualId,
        assignedId: actualId,
        needsPersistId: false
      };
    }

    const rowObj = rowToCanonicalObject_(headers, values[i], rowIndex, richValues[i] || []);
    const legacyId = buildLegacyId_(rowObj.rn, rowObj.dn, rowIndex);
    if (legacyId === targetId) {
      return {
        rowIndex: rowIndex,
        matchedBy: 'legacy',
        actualId: actualId,
        assignedId: actualId || legacyId,
        needsPersistId: !actualId
      };
    }

    if (!actualId && targetId === clean_(rowObj.id)) {
      return {
        rowIndex: rowIndex,
        matchedBy: 'computed',
        actualId: actualId,
        assignedId: clean_(rowObj.id) || legacyId,
        needsPersistId: true
      };
    }
  }
  return null;
}

function readRowObjectAt_(sh, rowIndex) {
  const lastCol = Math.max(sh.getLastColumn(), HEADERS.length);
  const headers = sanitizeHeaderRow_(sh.getRange(1, 1, 1, lastCol).getValues()[0]);
  const row = sh.getRange(rowIndex, 1, 1, lastCol).getValues()[0];
  const richRow = sh.getRange(rowIndex, 1, 1, lastCol).getRichTextValues()[0];
  return rowToCanonicalObject_(headers, row, rowIndex, richRow);
}

/** =========================
 *  MAPPERS
 * ========================= */
function rowToObject_(headers, row) {
  const obj = {};
  headers.forEach((h, i) => {
    obj[h] = row[i];
  });
  return obj;
}

function rowToCanonicalObject_(headers, row, rowIndex, richRow) {
  const safeHeaders = sanitizeHeaderRow_(headers);

  // ── FIX: build raw object ด้วย normalized key ──
  const raw = {};
  safeHeaders.forEach((h, i) => {
    if (h) raw[h] = row[i];
  });

  // ── FIX: pick() ค้นหาด้วย canonical key ก่อน แล้ว alias ──
  function pick(canonicalKey, fallback) {
    // 1) ลอง canonical key โดยตรง (เช่น 'stampA_json')
    if (Object.prototype.hasOwnProperty.call(raw, canonicalKey)) {
      const v = raw[canonicalKey];
      if (v !== '' && v !== null && v !== undefined) return v;
    }
    // 2) ลอง normalized key (เช่น 'stampajson')
    const normalizedCanonical = normalizeHeader_(canonicalKey);
    for (const k in raw) {
      if (!Object.prototype.hasOwnProperty.call(raw, k)) continue;
      if (normalizeHeader_(k) === normalizedCanonical) {
        const v = raw[k];
        if (v !== '' && v !== null && v !== undefined) return v;
      }
    }
    // 3) ลอง aliases
    const aliases = HEADER_ALIASES[canonicalKey] || [];
    for (let i = 0; i < aliases.length; i++) {
      const normalizedAlias = normalizeHeader_(aliases[i]);
      for (const k in raw) {
        if (!Object.prototype.hasOwnProperty.call(raw, k)) continue;
        if (normalizeHeader_(k) === normalizedAlias) {
          const v = raw[k];
          if (v !== '' && v !== null && v !== undefined) return v;
        }
      }
    }
    return fallback;
  }

  const idxFileName = safeHeaders.indexOf('file_name');
  const idxFileUrl = safeHeaders.indexOf('drive_file_url');
  const idxFileId = safeHeaders.indexOf('drive_file_id');
  const richFileName = getRichCellText_(idxFileName >= 0 && richRow ? richRow[idxFileName] : null);
  const richFileLink = getRichCellLink_(idxFileName >= 0 && richRow ? richRow[idxFileName] : null);
  const richUrlLink = getRichCellLink_(idxFileUrl >= 0 && richRow ? richRow[idxFileUrl] : null);
  const richIdText = getRichCellText_(idxFileId >= 0 && richRow ? richRow[idxFileId] : null);

  const fileName = clean_(pick('file_name', '')) || clean_(richFileName);
  const fileUrl = clean_(pick('drive_file_url', '')) || clean_(richUrlLink) || clean_(richFileLink);
  const fileId = clean_(pick('drive_file_id', ''))
    || extractDriveId_(fileUrl)
    || extractDriveId_(fileName)
    || extractDriveId_(richIdText)
    || extractDriveId_(richFileLink);

  return {
    rowIndex: rowIndex,
    id: clean_(pick('id', '')) || buildLegacyId_(pick('rn', ''), pick('dn', ''), rowIndex),
    rn: clean_(pick('rn', '')),
    ra: clean_(pick('ra', '')),
    dn: clean_(pick('dn', '')),
    dd: clean_(pick('dd', '')),
    title: clean_(pick('title', '')),
    fr: clean_(pick('fr', '')),
    to: clean_(pick('to', '')),
    src: clean_(pick('src', '')),
    urgency: clean_(pick('urgency', '')),
    file_name: fileName,
    file_mime: clean_(pick('file_mime', '')),
    file_size: toNumber_(pick('file_size', 0)),
    drive_file_id: fileId,
    drive_file_url: fileUrl,
    sorted: toBoolLoose_(pick('sorted', false)),
    sd_json: jsonStringifySafe_(pick('sd_json', []), []),
    sn: clean_(pick('sn', '')),
    sby: clean_(pick('sby', '')),
    spos: clean_(pick('spos', '')),
    sa: clean_(pick('sa', '')),
    dst_json: jsonStringifySafe_(pick('dst_json', {}), {}),
    // ── FIX: ใช้ canonical key ตรงๆ ──
    stampA_json: jsonStringifySafe_(pick('stampA_json', { x: 75, y: 5 }), { x: 75, y: 5 }),
    stampSv_json: jsonStringifySafe_(pick('stampSv_json', { x: 5, y: 70 }), { x: 5, y: 70 }),
    amends_json: jsonStringifySafe_(pick('amends_json', []), []),
    created_by: clean_(pick('created_by', '')),
    created_by_username: clean_(pick('created_by_username', '')),
created_at_iso: clean_(pick('created_at_iso', '')),
    updated_at_iso: clean_(pick('updated_at_iso', '')),
    replyDue: clean_(pick('replyDue', ''))
  };
}

function mapRowToClient_(row) {
  return {
    id: row.id || '',
    rn: row.rn || '',
    ra: row.ra || '',
    dn: row.dn || '',
    dd: row.dd || '',
    title: row.title || '',
    fr: row.fr || '',
    to: row.to || '',
    src: row.src || '',
    urgency: row.urgency || '',
    file: row.file_name || '',
    fileType: row.file_mime || '',
    fileSize: Number(row.file_size || 0),
    driveFileId: row.drive_file_id || '',
    driveFileUrl: row.drive_file_url || '',
    sorted: toBool_(row.sorted),
    sd: parseJson_(row.sd_json, []),
    sn: row.sn || '',
    sby: row.sby || '',
    spos: row.spos || '',
    sa: row.sa || '',
    dst: parseJson_(row.dst_json, {}),
    // ── FIX: อ่านจาก canonical key ──
    stampA: parseJson_(row.stampA_json, { x: 75, y: 5 }),
    stampSv: parseJson_(row.stampSv_json, { x: 5, y: 70 }),
    amends: parseJson_(row.amends_json, []),
    created_by: row.created_by || '',
    createdBy: row.created_by || '',
    created_by_username: row.created_by_username || '',
    createdByUsername: row.created_by_username || '',
    created_at_iso: row.created_at_iso || '',
    updated_at_iso: row.updated_at_iso || '',
    replyDue: row.replyDue || ''
  };
}

/** =========================
 *  UTILITIES
 * ========================= */
function clean_(value) {
  return String(value || '').trim();
}

function json_(obj) {
  return JSON.stringify(obj == null ? null : obj);
}

function jsonStringifySafe_(value, fallback) {
  if (value === '' || value === null || value === undefined) return JSON.stringify(fallback);
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return JSON.stringify(fallback);
    try {
      JSON.parse(trimmed);
      return trimmed;
    } catch (err) {
      return JSON.stringify(fallback);
    }
  }
  try {
    return JSON.stringify(value);
  } catch (err) {
    return JSON.stringify(fallback);
  }
}

function parseJson_(value, fallback) {
  try {
    if (value === '' || value === null || value === undefined) return fallback;
    if (typeof value === 'object') return value;
    return JSON.parse(value);
  } catch (err) {
    return fallback;
  }
}

function toBool_(value) {
  return value === true || value === 'true' || value === 1 || value === '1';
}

function toBoolLoose_(value) {
  if (typeof value === 'boolean') return value;
  const text = clean_(value).toLowerCase();
  return ['true', '1', 'yes', 'y', 'คัดแยกแล้ว', 'แล้ว'].indexOf(text) !== -1;
}

function toNumber_(value) {
  const n = Number(value);
  return isNaN(n) ? 0 : n;
}

function defaultFileName_(mimeType) {
  const stamp = Utilities.formatDate(new Date(), CFG.TIMEZONE, 'yyyyMMdd_HHmmss');
  if (mimeType === 'application/pdf') return 'DOC_' + stamp + '.pdf';
  if (mimeType === 'image/png') return 'DOC_' + stamp + '.png';
  return 'DOC_' + stamp + '.jpg';
}

function formatThaiDateTime_(dateObj) {
  const d = new Date(dateObj);
  const y = d.getFullYear() + 543;
  const m = pad2_(d.getMonth() + 1);
  const day = pad2_(d.getDate());
  const hh = pad2_(d.getHours());
  const mm = pad2_(d.getMinutes());
  return y + '-' + m + '-' + day + ' ' + hh + ':' + mm;
}

function pad2_(n) {
  return String(n).padStart(2, '0');
}

function normalizeHeader_(value) {
  return clean_(value).toLowerCase().replace(/[\s_\-./()]+/g, '');
}

function sanitizeHeaderRow_(headers) {
  return (headers || []).map(h => {
    const normalized = normalizeHeader_(h);
    if (!normalized) return '';

    // ── FIX: ค้นหา canonical header โดยเทียบ normalized แบบ case-insensitive ──
    const canonical = HEADERS.find(key => normalizeHeader_(key) === normalized);
    if (canonical) return canonical;

    for (var key in HEADER_ALIASES) {
      if (!Object.prototype.hasOwnProperty.call(HEADER_ALIASES, key)) continue;
      const matched = (HEADER_ALIASES[key] || []).some(alias => normalizeHeader_(alias) === normalized);
      if (matched) return key;
    }
    return normalized;
  });
}

function buildLegacyId_(rn, dn, rowIndex) {
  const base = clean_(rn || dn) || ('ROW' + rowIndex);
  return 'legacy-' + base.replace(/[^0-9a-zA-Zก-๙]+/g, '-');
}

function getRichCellText_(rich) {
  try {
    return rich ? String(rich.getText() || '').trim() : '';
  } catch (err) {
    return '';
  }
}

function getRichCellLink_(rich) {
  try {
    if (!rich) return '';
    const direct = rich.getLinkUrl();
    if (direct) return String(direct).trim();
    const runs = rich.getRuns ? rich.getRuns() : [];
    for (let i = 0; i < runs.length; i++) {
      const url = runs[i].getLinkUrl();
      if (url) return String(url).trim();
    }
    return '';
  } catch (err) {
    return '';
  }
}

function extractDriveId_(text) {
  const s = clean_(text);
  if (!s) return '';

  const patterns = [
    /\/d\/([a-zA-Z0-9_-]{20,})/,
    /[?&]id=([a-zA-Z0-9_-]{20,})/,
    /[?&]fileId=([a-zA-Z0-9_-]{20,})/,
    /^([a-zA-Z0-9_-]{20,})$/,
    /([-\w]{25,})/
  ];

  for (let i = 0; i < patterns.length; i++) {
    const m = s.match(patterns[i]);
    if (m && m[1]) return m[1];
  }
  return '';
}
