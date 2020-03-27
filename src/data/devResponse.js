import fetch, {Request} from 'node-fetch'
import {checkStatus} from '../helpers/httpStatusCheck'

export function getDevResponses(devRequests) {
   //Grab dev.TO requests only
   const promises = devRequests.map((req) => {
      if (req.api_id === 1) {
         return fetch(new Request(req.query, req.init))
      }
   })
   //IIFE to grab results right away
   let results = (async () => {
      try {
         const waiter = await Promise.all(promises).then(checkStatus)
         const responses = await waiter.map((res) => res.json())
         const sanitizedResponses = convertDevArticles(responses)
         return sanitizedResponses
      } catch (error) {
         console.log(error)
      }
   })()

   return results
}

function convertDevArticles(promises) {
   let articles = []
   promises.map((promise) => {
      promise.then((data) => {
         data.map((res) => {
            let article = {}
            article.url = res.url
            article.title = res.title
            article.imageUrl = res.cover_image === undefined ? '../images/no-img.jpg' : res.cover_image
            article.reactions = res.positive_reactions_count
            articles.push(article)
         })
      })
   })
   return articles
}
