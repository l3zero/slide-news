import {getDevResponses} from '../data/devResponse'
import {formData} from '../data/constData'
import nodeCache from 'node-cache'
// const cache = new nodeCache({stdTTL: 600, maxKeys: 1000000}) //In seconds

export function getResponses(requests) {
   let resArray = []
   let idArray = [1, 2, 3]

   for (let index = 0; index < requests.length; index++) {
      let currentId = requests[index].api_id

      //Limit API calls to one per api ID
      let currentResponses = idArray.includes(currentId) ? responseDecider(currentId)(requests) : null
      resArray = currentResponses === null ? resArray : resArray.concat(currentResponses)
      idArray.splice(idArray.indexOf(currentId), 1)
   }
   return resArray
}

function responseDecider(id) {
   switch (id) {
      case 1:
         return getDevResponses
      case 2:
         return 'hackerNews' //This will be an api

      default:
         break
   }
}
