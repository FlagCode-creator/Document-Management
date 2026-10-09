# Document-Management

ระบบสารบรรณวิทยาลัยเสริมทักษะ พระภิกษุ สามเณร ทำงานบน Google Apps Script
ใช้ Google Sheet เก็บทะเบียนหนังสือและบัญชีผู้ใช้ และใช้โฟลเดอร์ Google Drive เก็บไฟล์แนบ

## ไฟล์

- `รหัส.js` โค้ดฝั่งเซิร์ฟเวอร์ (Apps Script)
- `index.html` หน้าเว็บทั้งหมด
- `appsscript.json` ค่าตั้งของโปรเจกต์ Apps Script
- `config.example.js` ตัวอย่างไฟล์ `config.js` ไฟล์จริงไม่อยู่ใน git
- `.github/workflows/deploy.yml` ส่งโค้ดเข้า Apps Script อัตโนมัติ

## การส่งโค้ดเข้า Apps Script

ทุกครั้งที่ push เข้า `main` GitHub Actions จะสร้าง `config.js` จาก GitHub Secrets
แล้วรัน `clasp push` โค้ดใหม่จะไปอยู่ที่ @HEAD ทดสอบได้ผ่านลิงก์ `/dev`

ลิงก์ใช้งานจริง `/exec` จะเปลี่ยนเมื่อสั่งเองเท่านั้น
ไปที่แท็บ Actions เลือก "Deploy to Apps Script" กด "Run workflow" แล้วติ๊ก "อัปเดตลิงก์ใช้งานจริง /exec ด้วย"

## GitHub Secrets ที่ต้องตั้ง

Settings > Secrets and variables > Actions > New repository secret

| ชื่อ | ค่า |
| --- | --- |
| `CLASPRC_JSON` | เนื้อหาไฟล์ `~/.clasprc.json` หลังรัน `npx @google/clasp login` |
| `SPREADSHEET_ID` | ID ของ Google Sheet |
| `UPLOAD_FOLDER_ID` | ID ของโฟลเดอร์ไฟล์แนบ บัญชีที่ deploy ต้องมีสิทธิ์แก้ไข |
| `DEFAULT_PASSWORD` | รหัสผ่านเริ่มต้นตอนสร้างบัญชีครั้งแรก |
| `DEPLOYMENT_ID` | ID ของ deployment `/exec` ดูได้จาก `npx @google/clasp deployments` |

## พัฒนาในเครื่อง

คัดลอก `config.example.js` เป็น `config.js` ใส่ค่าจริง แล้วใช้ `npx @google/clasp push` ส่งขึ้นเองได้
