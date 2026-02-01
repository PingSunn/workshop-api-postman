# 🎓 Workshop API by PingSunn

> 📚 **สื่อการสอนเกี่ยวกับ API และ Postman** – เหมาะสำหรับผู้เริ่มต้นเรียนรู้การทำงานกับ REST API
> 
> 🤖 **Built with AI** – โปรเจกต์นี้สร้างโดย AI (Gemini) เพื่อสาธิตการใช้งาน API

---

## 📁 โครงสร้าง

```
├── participant/    # Basic CRUD API (สำหรับน้องๆ)
├── instructor/     # API + Frontend (สำหรับผู้สอน)
└── postman/        # Collection + Environment
```

---

## 👩‍💻 สำหรับน้องๆ (Participant)

```bash
cd participant
docker-compose up -d --build
```

**Swagger**: http://localhost:8000/docs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/items` | สร้าง item |
| GET | `/items` | ดูทั้งหมด |
| GET | `/items/{id}` | ดูตาม ID |
| PUT | `/items/{id}` | แก้ไข |
| DELETE | `/items/{id}` | ลบ |

---

## 👨‍🏫 สำหรับผู้สอน (Instructor)

```bash
cd instructor
docker-compose up -d --build
```

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **Swagger** | http://localhost:8001/docs |

---

## 📮 วิธี Import Postman

### 1. Import Collection & Environment

1. เปิด Postman → Click **Import** (หรือ Ctrl+O)
2. ลาก 2 ไฟล์นี้ไปวาง:
   - `postman/collection.json`
   - `postman/environment.json`

### 2. เลือก Environment

1. มุมขวาบน → Click dropdown **"No Environment"**
2. เลือก **"Workshop API by PingSunn"**

### 3. ตั้งค่า Environment Variables

| Variable | Value | ใช้กับ |
|----------|-------|--------|
| `local_endpoint` | `http://localhost:8000` | CRUD Items (Participant) |
| `target_endpoint` | `http://<IP ผู้สอน>:8001` | Register (Instructor) |

### 4. ทดสอบ!

เลือก request แล้วกด **Send** ได้เลย 🚀

---

## 🔧 Tech Stack

- **Backend**: Python 3.13 + FastAPI + Redis
- **Frontend**: React + Vite + Tailwind CSS v4
- **Container**: Docker + Docker Compose

---

## 📜 License

MIT License - ใช้เพื่อการศึกษาได้อย่างอิสระ

---

<p align="center">
  Made with ❤️ by <a href="https://instagram.com/ping.p_">@ping.p_</a> + 🤖 AI
</p>
