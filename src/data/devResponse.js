import fetch, {Request} from 'node-fetch'
import {checkStatus} from '../helpers/httpStatusCheck'

export function getDevResponses(devRequests) {
   //Grab dev.TO requests only
   const promises = devRequests.map((req) => {
      if (req.api_id === 1) {
         return fetch(new Request(req.query, req.init))
      }
   })
   //IIFE to grab results right away
   let results = (async () => {
      try {
         const waiter = await Promise.all(promises).then(checkStatus)
         const responses = await waiter.map((res) => res.json())

         return responses
      } catch (error) {
         console.log(error)
      }
   })()

   return results
}
