import { writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const keys = ['CLASPRC_JSON', 'SPREADSHEET_ID', 'UPLOAD_FOLDER_ID', 'DEFAULT_PASSWORD'];
const missing = keys.filter(k => !process.env[k]);
if (missing.length) {
  console.error(`::error::ยังไม่ได้ตั้ง GitHub secret: ${missing.join(', ')}`);
  process.exit(1);
}

JSON.parse(process.env.CLASPRC_JSON);
writeFileSync(join(homedir(), '.clasprc.json'), process.env.CLASPRC_JSON);

const secrets = Object.fromEntries(keys.slice(1).map(k => [k, process.env[k]]));
writeFileSync('config.js', `const SECRETS = ${JSON.stringify(secrets, null, 2)};\n`);
