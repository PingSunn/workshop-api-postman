#!/bin/bash

# Test script to register 50 participants

API_URL="http://localhost:8001/register"

# Thai names for testing
NAMES=(
  "สมชาย" "สมหญิง" "วิชัย" "วิภา" "ประยุทธ์" 
  "ประยูร" "มานะ" "มานี" "ปิติ" "ชูใจ"
  "กนก" "กมล" "กรรณิกา" "กฤษณา" "กานดา"
  "จันทร์" "จิตรา" "ชลธิชา" "ชัยวัฒน์" "ณัฐพล"
  "ดวงใจ" "ธนา" "ธิดา" "นภา" "นิภา"
  "บุญมี" "ปราณี" "พรรณี" "พิชัย" "ภาณุ"
  "มนัส" "ยุพา" "รัตนา" "ลำดวน" "วรรณา"
  "ศรีสุดา" "สมศรี" "สุดา" "สุนีย์" "สุภา"
  "อรุณ" "อารีย์" "อุทัย" "เกษม" "เพ็ญ"
  "แสงจันทร์" "โสภา" "ไพรัตน์" "ไพลิน" "ไอรดา"
)

NOTES=(
  "Postman Pro" "API Master" "REST Expert" "JSON Ninja" "HTTP Hero"
  "Dev Team" "QA Team" "Backend" "Frontend" "Full Stack"
  "" "" "" "" ""
)

echo "🚀 Starting registration of 50 participants..."
echo ""

for i in $(seq 1 50); do
  # Get random name and note
  NAME="${NAMES[$((RANDOM % ${#NAMES[@]}))]}"
  NOTE="${NOTES[$((RANDOM % ${#NOTES[@]}))]}"
  
  # Make the request
  RESPONSE=$(curl -s -X 'POST' \
    "$API_URL" \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d "{
    \"name\": \"$NAME\",
    \"note\": \"$NOTE\"
  }")
  
  printf "[%02d/50] Registered: %s" "$i" "$NAME"
  if [ -n "$NOTE" ]; then
    printf " (%s)" "$NOTE"
  fi
  echo ""
  
  # Small delay to see the animation
  sleep 0.1
done

echo ""
echo "✅ Done! Registered 50 participants."
