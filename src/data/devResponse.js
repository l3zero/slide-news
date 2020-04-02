import fetch, {Request} from 'node-fetch'
import {checkStatus} from '../helpers/httpStatusCheck'

export function getDevResponses(requests) {
   //Grab dev.TO requests only
   const devPromises = requests.map((req) => {
      if (req.api_id === 1) {
         return fetch(new Request(req.query, req.init))
      }
   })

   //IIFE to grab results right away
   let results = (() => {
      try {
         const responses = (() => devPromises.map((p) => p.then(checkStatus).then((res) => res.json())))()

         const sanitizedResponses = convertArticles(responses)
         return sanitizedResponses
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