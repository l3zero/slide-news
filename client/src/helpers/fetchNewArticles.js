import {getResponses} from '../helpers/apiHandler'

//Grab API responses once requests are loaded
export function fetchArticles(requests) {
   let myArticles = []
   const promResponses = getResponses(requests)
   const resolved = promResponses.map((source) =>
      source.then((promArray) =>
         promArray.map((p) =>
            p.then((result) => {
               if (result !== undefined) {
                  const duplicate = myArticles.find((item) => item.url === result.url)
                  if (!duplicate) {
                     myArticles = myArticles.concat(result)
                  }
               }
               return myArticles
            })
         )
      )
   )
   return Promise.all(resolved).then(() => {
      return myArticles
   })
}
