# 👨‍🏫 Instructor Dashboard

แดชบอร์ดสำหรับ Instructor ดูรายชื่อผู้เข้าร่วม Workshop แบบ Real-time

## 🚀 Quick Start

```bash
docker-compose up -d --build
```

## 🔗 URLs

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **API Docs** | http://localhost:8001/docs |
| **Redis** | localhost:6379 |

## ✨ Features

### Frontend
- 🎨 Dark theme + Amber/Gold accents
- 📊 6-column responsive grid layout
- 🔴 Live indicator (pulse animation)
- ✨ New participant highlight effect
- 🔄 Auto-refresh every 5 seconds

### API
- `GET /participants` - ดูรายชื่อทั้งหมด (คนใหม่ขึ้นบน)
- `POST /register` - ลงทะเบียน
- `GET /check/{name}` - เช็คว่าลงทะเบียนหรือยัง
- `DELETE /participants` - ล้างทั้งหมด
- `DELETE /participants/{id}` - ลบรายบุคคล

## 🛠️ Development

```bash
# Frontend dev (hot reload)
cd frontend && npm run dev

# API runs on port 8001
```

## 🧪 Test Script

```bash
# Register 50 test participants
./test_register_50.sh
```

## 🗑️ Reset Data

```bash
curl -X DELETE http://localhost:8001/participants
```

## ⏹️ Stop

```bash
docker-compose down
```
