export function checkStatus(resArray) {
   return resArray.map((r) => {
      if (r.ok) {
         return r
      } else {
         throw new Error(r.statusText)
      }
   })
}
