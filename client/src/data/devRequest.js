import {formData} from './formData'

export const devReqs = (options) => {
   const id = formData.SOURCES.find((source) => source.name === 'Dev.to').internal_id
   const apiUrl = formData.SOURCES.find((source) => source.name === 'Dev.to').url
   let devArray = []
   // eslint-disable-next-line array-callback-return
   options.myTopics.map((topic) => {
      devArray.push({
         api_id: id,
         query: `${apiUrl}?tag=${topic}&top=7&per_page=10`,
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
