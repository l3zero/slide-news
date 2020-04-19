/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import {createRequests} from '../data/reqFactory'
import {getResponses} from '../helpers/apiHandler'
import fetch, {Request} from 'node-fetch'
const moment = require('moment')
// import '../styles/news.css'

export default function News() {
   const [myNewsOptions] = useState({
      ...JSON.parse(window.localStorage.getItem('myNewsOptions'))
   })
   const [isExpired, setIsExpired] = useState(null)

   const [myRequests, setMyRequests] = useState([])
   const [myResponses, setMyResponses] = useState([])

   useEffect(() => {
      if (expirationCheck(JSON.stringify(myNewsOptions.expires))) {
         // console.log('expired flag')
         setIsExpired(true)
         setMyRequests(createRequests(myNewsOptions))
      } else {
         // console.log('not expired flag')
         setIsExpired(false)
      }
   }, [])

   useEffect(() => {
      if (isExpired) {
         // console.log('entering isExpired land')
         //Grab API responses once requests are loaded
         let articles = []
         const promResponses = getResponses(myRequests)
         // console.log(promResponses)
         promResponses.map((source) =>
            source.then((promArray) =>
               promArray.map((p) =>
                  p.then((result) => {
                     articles = result === undefined || result.url === undefined ? articles : articles.concat(result)
                     setMyResponses(articles)
                  })
               )
            )
         )
         //Send articles to DB here
         fetch(
            new Request('http://localhost:9000/mynews/upload', {
               method: 'POST',
               headers: new Headers({
                  Accept: 'application/json'
               }),
               body: JSON.stringify({
                  newsId: JSON.stringify(myRequests.id),
                  created: JSON.stringify(myRequests.created),
                  expires: JSON.stringify(myRequests.expires)
                  // articles: myResponses
               })
            })
         )
      }
   }, [isExpired])

   let newsScreen = (
      /*myResponses.length === 0 ? (
         <div id='loading-widget'>Loading...</div>
      ) : */ <React.Fragment>
         <Header />
         <div>Check console for now</div>
         <Footer />
      </React.Fragment>
   )

   return newsScreen
}

function expirationCheck(expireDate) {
   const now = moment()
   const exp = moment(expireDate)

   if (exp.diff(now, 'days') < 1) {
      return true
   } else {
      return false
   }
}
