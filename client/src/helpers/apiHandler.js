import {getDevResponses} from '../data/devResponse'
import {getHackResponses} from '../data/hackerNewsResponse'

export function getResponses(requests) {
   let resArray = []

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
