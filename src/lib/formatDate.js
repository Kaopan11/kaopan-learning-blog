// แปลงวันที่ ISO 8601 ให้เป็นข้อความอ่านง่าย เช่น "11 September 2024"
export function formatDate(isoDateString) {
  return new Date(isoDateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
