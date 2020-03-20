export const devNews = (options) => {
   let devArray = []
   options.myTopics.map((topic) => {
      devArray.push({
         url: 'https://dev.to/api/articles',
         tag: `?tag=${topic}`,
         top: `&top=${options.myInterval[0].value}`
      })
   })
   return devArray
}
