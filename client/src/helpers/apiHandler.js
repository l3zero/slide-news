import {getDevResponses} from '../data/devResponse'
import {getHackResponses} from '../data/hackerNewsResponse'
import {formData} from '../data/formData'
import nodeCache from 'node-cache'
// const cache = new nodeCache({stdTTL: 600, maxKeys: 1000000}) //In seconds

export function getResponses(requests) {
   let resArray = []
   const idArray = [1, 2, 3]

   for (let index = 0; index < requests.length; index++) {
      let currentId = requests[index].api_id
      let currentResponses = responseDecider(currentId)(requests[index])
      resArray = resArray.concat(currentResponses)
   }

   return resArray
}

function responseDecider(id) {
   switch (id) {
      case 1:
         return getDevResponses
      case 2:
         return getHackResponses
      default:
         break
   }
}
