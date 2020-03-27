import fetch, {Request} from 'node-fetch'
import {getDevResponses} from '../data/devResponse'
import nodeCache from 'node-cache'
// const cache = new nodeCache({stdTTL: 600, maxKeys: 1000000}) //In seconds

export function getResponses(requests) {
   let resArray = new Array()
   let idArray = [1, 2, 3]

   for (let index = 0; index < requests[0].total_reqs; index++) {
      let currentId = requests[index].api_id

      let currentResponses = idArray.includes(currentId) ? responseDecider(currentId)(requests) : ''
      resArray = currentResponses === '' ? resArray.concat([]) : resArray.concat(currentResponses)
      idArray.splice(idArray.indexOf(currentId), 1)
   }
   return resArray
}

function responseDecider(id) {
   switch (id) {
      case 1:
         return getDevResponses
         break
      case 2:
         return 'hackerNews' //This will be an api
         break

      default:
         break
   }
}
