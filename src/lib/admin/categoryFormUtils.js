// ตรวจสอบชื่อหมวดหมู่ก่อนบันทึก
export function validateCategoryName(name) {
  return name.trim().length > 0
}
