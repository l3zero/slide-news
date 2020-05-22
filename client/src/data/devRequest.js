import {formData} from './formData'

export const devReqs = (options) => {
   const id = formData.SOURCES.find((source) => source.name === 'Dev.to').internal_id
   const apiUrl = formData.SOURCES.find((source) => source.name === 'Dev.to').url
   let devArray = []
   options.myTopics.map((topic) => {
      devArray.push({
         api_id: id,
         query: `${apiUrl}?tag=${topic}&top=7&per_page=5`,
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
