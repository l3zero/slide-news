export function checkStatus(r) {
   // return resArray.map((r) => {
   if (r.ok) {
      return r
   } else {
      throw Error(r.statusText)
   }
   // })
}
