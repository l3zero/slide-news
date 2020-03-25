import fetch, {Request} from 'node-fetch'
import nodeCache from 'node-cache'
// const cache = new nodeCache({stdTTL: 600, maxKeys: 1000000}) //In seconds

export function getResponses(requests) {
   const promises = requests.map((req) => fetch(new Request(req.query, req.init)))
   //IIFE to grab results right away
   let results = (async () => {
      try {
         const waiter = await Promise.all(promises).then(checkStatus)
         const responses = await waiter.map((res) => res.json())
         // console.log(await responses[0].then())

         return responses
      } catch (error) {
         console.log(error)
      }
   })()

   return results
}

function checkStatus(resArray) {
   return resArray.map((r) => {
      if (r.ok) {
         return r
      } else {
         throw new Error(r.statusText)
      }
   })
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
