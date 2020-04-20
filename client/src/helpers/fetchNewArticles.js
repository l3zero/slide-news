import {getResponses} from '../helpers/apiHandler'

//Grab API responses once requests are loaded
export function fetchArticles(requests) {
   let myArticles = []
   const promResponses = getResponses(requests)
   const resolved = promResponses.map((source) =>
      source.then((promArray) =>
         promArray.map((p) =>
            p.then((result) => {
               myArticles = result === undefined ? myArticles : myArticles.concat(result)
               return myArticles
            })
         )
      )
   )

   return Promise.all(resolved).then(() => {
      return myArticles
   })
}
