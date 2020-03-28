export const devReqs = (options) => {
   const id = 1
   const numArticles = 5
   let devArray = []
   options.myTopics.map((topic) => {
      devArray.push({
         api_id: id,
         total_reqs: options.num_reqs,
         query: `https://dev.to/api/articles?tag=${topic}&top=${options.myInterval[0].value}&per_page=${numArticles}`,
         init: {
            method: 'GET',
            headers: new Headers({
               Accept: 'application/json'
            }),
            mode: 'cors'
         }
      })
   })
   return devArray
}
