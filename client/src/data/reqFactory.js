import {devReqs} from './devRequest'
import {hackReqs} from './hackerNewsRequest'

export function createRequests(options) {
   let reqArray = []
   // eslint-disable-next-line array-callback-return
   options.mySources.map((source) => {
      let sourceReqs = apiDecider(source.internal_id)(options)
      reqArray = reqArray.concat(sourceReqs)
   })
   return reqArray
}

function apiDecider(id) {
   switch (id) {
      case 1:
         return devReqs
      case 2:
         return hackReqs
      default:
         break
   }
}
