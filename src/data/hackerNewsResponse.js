import fetch, {Request} from 'node-fetch'
import {checkStatus} from '../helpers/httpStatusCheck'
const hackerItemUrl = 'https://hacker-news.firebaseio.com/v0/item'

export function getHackResponses(requests) {
   //Grab hackerNews data only
   const hackerReq = requests.find((req) => req.api_id === 2)
   const topStoriesPromise = fetch(new Request(hackerReq.topStoriesUrl, hackerReq.init))
   const newStoriesPromise = fetch(new Request(hackerReq.newStoriesUrl, hackerReq.init))

   //IIFE to grab results right away
   let results = (() => {
      try {
         const topStoryResponses = topStoriesPromise
            .then(checkStatus)
            .then((res) => res.json())
            .then((arr) =>
               arr.map((id) => {
                  const val = hackerNewsWorker(id)
                  if (val !== null) {
                     return val
                  }
               })
            )

         return topStoryResponses
      } catch (error) {
         console.log(error)
      }
   })()
   return results
}

//IIFE Fetches individual article and validates
function hackerNewsWorker(itemId) {
   const noImg = '../img/no-img.jpg'

   const response = fetch(
      new Request(`${hackerItemUrl}/${itemId}.json`, {
         method: 'GET',
         headers: new Headers({
            Accept: 'application/json'
         }),
         mode: 'cors'
      })
   )

   const result = (() => {
      const article = response
         .then((data) => data)
         .then((d) => {
            let json = d.json()

            if (hackerNewsValidator(json)) {
               return {
                  url: json.url,
                  id: json.id,
                  timePublished: json.time, //@TO-DO Need to convert this from Unix
                  title: json.title,
                  imageUrl: noImg
               }
            } else {
               return null
            }
         })
   })()

   return result
}

/* @param item refers to a HackerNews 'item', which can be a story, job, comment, etc.
@return true if validation is passed
*/
function hackerNewsValidator(item) {
   const passed = () => {
      const passedDelete = item.hasOwnProperty('deleted') ? item.deleted : true
      const passedType = item.hasOwnProperty('type') ? (item.type === 'story' ? true : false) : false
      const passedDead = item.hasOwnProperty('dead') ? (item.dead === true ? false : true) : true

      return passedDelete && passedType && passedDead
   }

   return passed
}
