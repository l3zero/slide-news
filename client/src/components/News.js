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
   const [isExpired] = useState(expirationCheck(myNewsOptions.expires))

   const [myRequests, setMyRequests] = useState([])
   const [myResponses, setMyResponses] = useState([])

   useEffect(() => {
      //@TODO This will be changed to be based on 'myInterval' value. Should only run fresh fetch if the interval value + createDate is past the current date (use moment.js)

      if (isExpired) {
         setMyRequests(createRequests(myNewsOptions))
      }

      //Grab API responses once requests are loaded
      let articles = []
      const promResponses = getResponses(myRequests)
      promResponses.map((source) =>
         source.then((promArray) =>
            promArray.map((p) =>
               p.then((result) => {
                  articles = result === undefined || result.url === undefined ? articles : articles.concat(result)
                  // setMyResponses(temp)
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
            body: JSON.stringify(articles)
         })
      )
   }, [])

   let newsScreen =
      myResponses.length === 0 ? (
         <div id='loading-widget'>Loading...</div>
      ) : (
         <React.Fragment>
            <Header />
            <div>Here is the news options: {JSON.stringify(myNewsOptions)}</div>
            <div>Here is the request array:{JSON.stringify(myRequests)}</div>
            <div>Here is the response titles:</div>
            <Footer />
         </React.Fragment>
      )

   return newsScreen
}

function expirationCheck(expireDate) {
   if (
      moment()
         .format('l')
         .diff(moment(expireDate)) < 1
   ) {
      return true
   } else {
      return false
   }
}
