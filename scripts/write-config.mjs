import { writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const keys = ['CLASPRC_JSON', 'SPREADSHEET_ID', 'UPLOAD_FOLDER_ID', 'DEFAULT_PASSWORD'];
const missing = keys.filter(k => !process.env[k]);
if (missing.length) {
  console.error(`::error::ยังไม่ได้ตั้ง GitHub secret: ${missing.join(', ')}`);
  process.exit(1);
}

let clasprc;
try {
  clasprc = JSON.parse(process.env.CLASPRC_JSON);
} catch {
  console.error(`::error::CLASPRC_JSON ไม่ใช่ JSON (ยาว ${process.env.CLASPRC_JSON.length} ตัวอักษร ขึ้นต้นด้วย "${process.env.CLASPRC_JSON.slice(0, 1)}") ให้คัดลอกเนื้อหาไฟล์ ~/.clasprc.json มาวางใหม่`);
  process.exit(1);
}
if (!clasprc.tokens || !clasprc.tokens.default) {
  console.error("::error::CLASPRC_JSON ไม่มี tokens.default ให้รัน npx @google/clasp login ใหม่แล้วคัดลอกไฟล์ ~/.clasprc.json");
  process.exit(1);
}
writeFileSync(join(homedir(), '.clasprc.json'), process.env.CLASPRC_JSON);

const secrets = Object.fromEntries(keys.slice(1).map(k => [k, process.env[k]]));
writeFileSync('config.js', `const SECRETS = ${JSON.stringify(secrets, null, 2)};\n`);
