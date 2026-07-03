// แยกเนื้อหา markdown จาก API เป็น section ย่อย (หัวข้อ + เนื้อหา)
export function parsePostContent(content) {
  return content
    .split(/^## /m)
    .filter(Boolean)
    .map((section) => {
      const [title, ...bodyLines] = section.split('\n')
      return {
        title: title.trim(),
        body: bodyLines.join('\n').trim(),
      }
    })
}
