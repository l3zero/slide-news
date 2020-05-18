import {formData} from './formData'

export const devReqs = (options) => {
   const id = formData.SOURCES.find((source) => source.name === 'Dev.to').internal_id
   const apiUrl = formData.SOURCES.find((source) => source.name === 'Dev.to').url
   const numArticles = 5
   let devArray = []
   options.myTopics.map((topic) => {
      devArray.push({
         api_id: id,
         query: `${apiUrl}?tag=${topic}&top=${options.myInterval[0].value}&per_page=${numArticles}`,
         init: {
            method: 'GET',
            headers: {
               Accept: 'application/json'
            },
            mode: 'cors'
         }
      })
   })
   return devArray
}
