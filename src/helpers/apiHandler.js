import fetch, {Request} from 'node-fetch'
import nodeCache from 'node-cache'
// const cache = new nodeCache({stdTTL: 600, maxKeys: 1000000}) //In seconds

export function getResponses(requests) {
   // const promises = requests.map((req) => fetch(new Request(req.query, req.init)))
   let rez = (async () => {
      try {
         const responses = await fetch(new Request(requests[0].query, requests[0].init))
         const jsonData = await responses.json()
         return jsonData
      } catch (error) {
         console.log(error)
      }
   })()

   let results = (async () => {
      const data = await rez
      return data
   })()
   console.log(results)
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
