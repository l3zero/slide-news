import fetch, {Request} from 'node-fetch'
import {checkStatus} from '../helpers/httpStatusCheck'

export function getDevResponses(requests) {
   //Grab dev.TO requests only
   const devReq = requests.find((req) => req.api_id === 1)
   const devPromise = fetch(new Request(devReq.query, devReq.init))

   //IIFE to grab results right away
   let results = (() => {
      try {
         const responses = devPromise
            .then(checkStatus)
            .then((res) => res.json())
            .then((arr) => arr.map((item) => item))

         const sanitizedResponses = convertArticles(responses)

         return sanitizedResponses
      } catch (error) {
         console.log(error)
      }
   })()
   return results
}

function convertArticles(prom) {
   const noImg = '../img/no-img.jpg'
   const articles = prom.then((arr) =>
      arr.map((res) => {
         let article = {}
         article.url = res.url
         article.title = res.title
         article.imageUrl = res.cover_image === null ? noImg : res.cover_image
         article.reactions = res.positive_reactions_count
         return article
      })
   )
   return articles
}
