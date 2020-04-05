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
         const topStoryResponses = (() =>
            [topStoriesPromise].map((p) =>
               p
                  .then(checkStatus)
                  .then((res) => res.json())
                  .then((arr) =>
                     arr.map((id) => {
                        const val = hackerNewsWorker(id)
                        if (val !== null) {
                           return val
                        } else {
                        }
                     })
                  )
            ))()
         // console.log(topStoryResponses)

         // const newStoryResponses = (() =>
         //    [newStoriesPromise].map((p) => p.then(checkStatus).then((res) => res.json())))()

         // const validatedResponses = hackerNewsWorker(topStoryResponses)

         return topStoryResponses
      } catch (error) {
         console.log(error)
      }
   })()
   return results
}

/*function convertArticles(proms) {
   const noImg = '../img/no-img.jpg'
   const articles = proms.map((prom) => {
      return prom.then((arr) => {
         return arr.map((res) => {
            let article = {}
            article.url = res.url
            article.title = res.title
            article.imageUrl = res.cover_image === null ? noImg : res.cover_image
            article.reactions = res.positive_reactions_count
            return article
         })
      })
   })
   return articles
}*/

/* @param item refers to a HackerNews 'item', which can be a story, job, comment, etc.
@return true if validation is passed
*/
function hackerNewsValidator(item) {
   const passedDelete = item.hasOwnProperty('deleted') ? item.deleted : true
   const passedType = item.hasOwnProperty('type') ? (item.type === 'story' ? true : false) : false
   const passedDead = item.hasOwnProperty('dead') ? (item.dead === true ? false : true) : true

   return passedDelete && passedType && passedDead
}

//Fetches individual article and validates
async function hackerNewsWorker(itemId) {
   const response = await fetch(
      new Request(`${hackerItemUrl}/${itemId}.json`, {
         method: 'GET',
         headers: new Headers({
            Accept: 'application/json'
         }),
         mode: 'cors'
      })
   )

   const jayson = await response.json()

   if (hackerNewsValidator(jayson)) {
      return jayson
   } else {
      return null
   }
}
