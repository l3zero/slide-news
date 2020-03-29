import {formData} from './constData'

export const hackReqs = (options) => {
   const id = formData.SOURCES.find((source) => source.name === 'Hacker News').internal_id
   const queryUrl = formData.SOURCES.find((source) => source.name === 'Hacker News').url
   const numArticles = 5
   let devArray = []
   options.myTopics.map((topic) => {
      devArray.push({
         api_id: id,
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
