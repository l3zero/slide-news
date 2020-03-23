import fetch from 'node-fetch'
import nodeCache from 'node-cache'
// const cache = new nodeCache({stdTTL: 600, maxKeys: 1000000}) //In seconds

export function getResponses(requests) {
   const promises = requests.map((req) => fetch(new Request(req.query, req.init)))
   let results = []

   Promise.all(promises)
      .then((responses) => {
         return responses.map((res) => res.json())
      })
      .then((data) => {
         results = data
         console.log(data)
      })
      .catch((error) => console.log(error))

   return results
}

function checkStatus(res) {
   if (res.ok) {
      return res
   } else {
      let erz = new Error(res.statusText)
      console.log(erz)
      throw erz
   }
}

function responseDecider(id) {
   switch (id) {
      case 1:
         return 'devResponse' //This will be an api
         break
      case 2:
         return 'hackerNews' //This will be an api
         break

      default:
         break
   }
}
