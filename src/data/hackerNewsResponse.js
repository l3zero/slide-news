import fetch, {Request} from 'node-fetch'
import {checkStatus} from '../helpers/httpStatusCheck'

export function getHackResponses(requests) {
   //Grab hackerNews data only
   const hackerReq = requests.find((req) => req.api_id === 2)
   const topStoriesPromise = fetch(new Request(hackerReq.topStoriesUrl, hackerReq.init))
   const newStoriesPromise = fetch(new Request(hackerReq.newStoriesUrl, hackerReq.init))

   //IIFE to grab results right away
   let results = (() => {
      try {
         const responses = (() =>
            [topStoriesPromise, newStoriesPromise].map((p) => p.then(checkStatus).then((res) => res.json())))()

         const sanitizedResponses = convertArticles(responses)

         return responses
      } catch (error) {
         console.log(error)
      }
   })()
   return results
}

function convertArticles(proms) {
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
}
