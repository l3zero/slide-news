export function urlToId(eyedee) {
   const reg = /[\:\/\.\-]/gim
   return eyedee
      .trim()
      .toLowerCase()
      .replace(reg, '')
}
