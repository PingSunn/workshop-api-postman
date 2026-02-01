# 👩‍💻 Basic CRUD API

เรียนรู้พื้นฐาน API ด้วย FastAPI

## Quick Start

```bash
docker-compose up -d --build
```

**Swagger UI**: http://localhost:8000/docs

## CRUD Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/items` | สร้าง item ใหม่ |
| GET | `/items` | ดูทั้งหมด |
| GET | `/items/{id}` | ดูตาม ID |
| PUT | `/items/{id}` | แก้ไข |
| DELETE | `/items/{id}` | ลบ |

## ตัวอย่าง Request Body

```json
{
  "name": "My Item",
  "description": "This is my first item"
}
```

## รันแบบ Local (ไม่ใช้ Docker)

```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
