export function urlToId(eyedee) {
   // eslint-disable-next-line no-useless-escape
   const reg = /[\https://\dev.to\.\-\/\_]/gim
   return eyedee
      .trim()
      .toLowerCase()
      .replace(reg, '')
}
