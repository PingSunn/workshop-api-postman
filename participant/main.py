from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import uuid

app = FastAPI(
    title="Workshop API - Basic CRUD",
    description="API เรียนรู้พื้นฐาน CRUD Operations",
    version="1.0.0"
)

# ============================================
# 🗃️ In-Memory Database
# ============================================
items_db: dict[str, dict] = {}

# ============================================
# 📦 Models
# ============================================
class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = None

class Item(BaseModel):
    id: str
    name: str
    description: Optional[str] = None

# ============================================
# 🎯 CRUD Endpoints
# ============================================

@app.post("/items", response_model=Item, status_code=201)
def create_item(data: ItemCreate):
    """
    CREATE - สร้าง item ใหม่
    """
    item_id = str(uuid.uuid4())[:8]
    item = {
        "id": item_id,
        "name": data.name,
        "description": data.description
    }
    items_db[item_id] = item
    return Item(**item)

@app.get("/items", response_model=list[Item])
def read_items():
    """
    READ - ดู items ทั้งหมด
    """
    return [Item(**item) for item in items_db.values()]

@app.get("/items/{item_id}", response_model=Item)
def read_item(item_id: str):
    """
    READ - ดู item ตาม ID
    """
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return Item(**items_db[item_id])

@app.put("/items/{item_id}", response_model=Item)
def update_item(item_id: str, data: ItemCreate):
    """
    UPDATE - แก้ไข item
    """
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    item = {
        "id": item_id,
        "name": data.name,
        "description": data.description
    }
    items_db[item_id] = item
    return Item(**item)

@app.delete("/items/{item_id}")
def delete_item(item_id: str):
    """
    DELETE - ลบ item
    """
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    del items_db[item_id]
    return {"message": "Item deleted"}
