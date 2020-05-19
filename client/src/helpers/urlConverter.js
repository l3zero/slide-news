export function urlToId(eyedee) {
   // const reg = /[\:\/\.\-]/gim
   const reg = /[\https://\dev.to\.\-\/\_]/gim
   return eyedee
      .trim()
      .toLowerCase()
      .replace(reg, '')
}
