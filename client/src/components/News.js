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
   const [dbObject, setDbObject] = useState(null)

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
         let myArticles = []
         const promResponses = getResponses(myRequests)
         // console.log(promResponses)
         promResponses.map((source) =>
            source.then((promArray) =>
               promArray.map((p) =>
                  p.then((result) => {
                     myArticles =
                        result === undefined || result.url === undefined ? myArticles : myArticles.concat(result)
                     setMyResponses(myArticles)
                     setDbObject({
                        method: 'POST',
                        headers: new Headers({
                           Accept: 'application/json',
                           'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({
                           newsId: myNewsOptions.id,
                           created: myNewsOptions.created,
                           expires: myNewsOptions.expires,
                           articles: myArticles
                        })
                     })
                  })
               )
            )
         )
      }
   }, [isExpired])

   useEffect(() => {
      //Send articles to DB here
      //Testing here to see how many objects are pushed
      if (dbObject !== null && myResponses.length !== 0) {
         fetch(new Request('http://localhost:9000/mynews/upload', dbObject))
      }
   }, [myResponses])

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
