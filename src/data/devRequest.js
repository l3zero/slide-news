export const devNews = (options) => {
   const id = 1
   let devArray = []
   options.myTopics.map((topic) => {
      devArray.push({
         query: `https://dev.to/api/articles?tag=${topic}&top=${options.myInterval[0].value}`,
         init: {
            method: 'GET',
            headers: new Headers({
               Accept: 'application/json'
            }),
            mode: 'cors'
         },
         apiId: id
      })
   })
   return devArray
}
