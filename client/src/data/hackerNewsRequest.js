import {formData} from './formData'

export const hackReqs = (options) => {
   const id = formData.SOURCES.find((source) => source.name === 'Hacker News').internal_id
   const apiUrl = formData.SOURCES.find((source) => source.name === 'Hacker News').url

   return [
      {
         api_id: id,
         itemUrl: `${apiUrl}/item/`,
         topics: options.myTopics,
         topStoriesUrl: `${apiUrl}/topstories.json`,
         newStoriesUrl: `${apiUrl}/newstories.json`,
         init: {
            method: 'GET',
            headers: {
               Accept: 'application/json'
            },
            mode: 'cors'
         }
      }
   ]
}
