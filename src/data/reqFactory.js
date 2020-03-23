import {devNews} from './devRequest'

export function createRequests(options) {
   let reqArray = []

   options.mySources.map((source) => {
      let sourceReqs = apiDecider(source.apiId)(options)
      reqArray = reqArray.concat(sourceReqs)
   })

   return reqArray
}

function apiDecider(id) {
   switch (id) {
      case 1:
         return devNews
         break
      case 2:
         return 'hackerNews' //This will be an api
         break

      default:
         break
   }
}
