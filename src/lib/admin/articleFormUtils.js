// ฟังก์ชันช่วยสำหรับฟอร์มบทความ — ค่าเริ่มต้นและ validation

const emptyForm = {
  thumbnail: null,
  category: '',
  author: '',
  title: '',
  intro: '',
  content: '',
}

export function getEmptyArticleForm() {
  return { ...emptyForm }
}

// ตรวจสอบว่ากรอกฟิลด์ที่จำเป็นครบก่อนบันทึก
export function validateArticleForm(form) {
  return Boolean(
    form.title.trim() &&
      form.category &&
      form.author.trim() &&
      form.intro.trim() &&
      form.content.trim(),
  )
}
