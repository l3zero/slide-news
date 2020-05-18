import fetch, {Request} from 'node-fetch'
import {checkStatus} from '../helpers/httpStatusCheck'
const hackerItemUrl = 'https://hacker-news.firebaseio.com/v0/item'

export function getHackResponses(hackerReq) {
   const topStoriesPromise = fetch(new Request(hackerReq.topStoriesUrl, hackerReq.init))
   const newStoriesPromise = fetch(new Request(hackerReq.newStoriesUrl, hackerReq.init))

   //IIFE to grab results right away
   let results = (() => {
      try {
         const topStoryResponses = (async () => {
            const res = await topStoriesPromise
            const data = await checkStatus(res)
            const arr = await data.json()

            return arr.map((id) => {
               const val = hackerNewsWorker(id, hackerReq.topics)
               return val
            })
         })()

         const newStoryResponses = (async () => {
            const res = await newStoriesPromise
            const data = await checkStatus(res)
            const arr = await data.json()

            return arr.map((id) => {
               const val = hackerNewsWorker(id, hackerReq.topics)
               return val
            })
         })()

         return [topStoryResponses, newStoryResponses]
      } catch (error) {
         console.error(error)
      }
   })()
   return results
}

//IIFE Fetches individual article and validates
function hackerNewsWorker(itemId, reqTopics) {
   const noImg = '../img/no-img.jpg'

   const prom = fetch(
      new Request(`${hackerItemUrl}/${itemId}.json`, {
         method: 'GET',
         headers: new Headers({
            Accept: 'application/json'
         }),
         mode: 'cors'
      })
   )

   const result = (async () => {
      const res = await prom
      const json = await res.json()

      if (json !== null && json !== undefined) {
         if (hackerNewsValidator(json) && topicValidator(json.title, reqTopics)) {
            return {
               //id: json.id,
               url: json.url,
               title: json.title,
               //timePublished: json.time,
               imageUrl: noImg
            }
         } else {
            return undefined
         }
      }
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
      const passedUrl = item.hasOwnProperty('url') ? (item.url !== undefined ? true : false) : false
      return passedDelete && passedType && passedDead && passedUrl
   }
   return passed
}

function topicValidator(itemTitle, topics) {
   if (itemTitle !== null && itemTitle !== undefined) {
      const array = topics.map((topic) => itemTitle.includes(topic))
      if (array.includes(true)) {
         return true
      } else {
         return false
      }
   }
}
