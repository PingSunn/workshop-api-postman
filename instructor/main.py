from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import redis
import json
import uuid
import time

app = FastAPI(title="Workshop API - Instructor", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redis connection
r = redis.Redis(host="redis", port=6379, db=0, decode_responses=True)

# Models
class ParticipantCreate(BaseModel):
    name: str
    note: Optional[str] = None

class Participant(BaseModel):
    id: str
    name: str
    note: Optional[str] = None

class CheckResponse(BaseModel):
    status: str
    message: str
    redirect: Optional[str] = None
    data: Optional[Participant] = None

# Helper
def get_all_participants():
    keys = r.keys("participant:*")
    participants = []
    for key in keys:
        data = r.get(key)
        if data:
            participants.append(json.loads(data))
    # Sort by timestamp (newest first), fallback to id if no timestamp
    participants.sort(key=lambda x: x.get("timestamp", 0), reverse=True)
    return participants

def find_by_name(name: str):
    for p in get_all_participants():
        if p["name"].lower() == name.lower():
            return p
    return None

# Endpoints
@app.get("/check/{name}", response_model=CheckResponse)
def check_registration(name: str):
    """เช็คว่าลงทะเบียนหรือยัง"""
    participant = find_by_name(name)
    if participant:
        return CheckResponse(
            status="success",
            message="Already registered",
            data=Participant(**participant)
        )
    return CheckResponse(
        status="error",
        message="Not registered",
        redirect="/register"
    )

@app.post("/register", response_model=Participant)
def register(data: ParticipantCreate):
    """ลงทะเบียนชื่อใหม่"""
    existing = find_by_name(data.name)
    if existing:
        return Participant(**existing)
    
    participant_id = str(uuid.uuid4())[:8]
    participant = {
        "id": participant_id,
        "name": data.name,
        "note": data.note,
        "timestamp": time.time()
    }
    r.set(f"participant:{participant_id}", json.dumps(participant))
    return Participant(**participant)

@app.get("/participants", response_model=list[Participant])
def get_participants():
    """ดูรายชื่อทั้งหมด"""
    return [Participant(**p) for p in get_all_participants()]

@app.get("/participants/{id}", response_model=Participant)
def get_participant(id: str):
    """ดูข้อมูลคนเดียว"""
    data = r.get(f"participant:{id}")
    if not data:
        return {"error": "Not found"}
    return Participant(**json.loads(data))

@app.delete("/participants/{id}")
def delete_participant(id: str):
    """ลบข้อมูล"""
    r.delete(f"participant:{id}")
    return {"status": "deleted"}

@app.delete("/participants")
def clear_all():
    """ลบทั้งหมด (สำหรับ reset)"""
    keys = r.keys("participant:*")
    for key in keys:
        r.delete(key)
    return {"status": "cleared", "count": len(keys)}

