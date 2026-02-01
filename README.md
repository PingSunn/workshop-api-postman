# 🎓 Workshop API & Postman

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

### 1. Import Collection

1. เปิด Postman → Click **Import** (หรือ Ctrl+O)
2. ลาก `postman/collection.json` ไปวาง
3. หรือ Click **Upload Files** → เลือกไฟล์

### 2. Import Environment

1. Click **Import** อีกครั้ง
2. ลาก `postman/participant.postman_environment.json` ไปวาง

### 3. เลือก Environment

1. มุมขวาบน → Click dropdown **"No Environment"**
2. เลือก **"Participant (Port 8000)"**

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
