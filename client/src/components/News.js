/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import {createRequests} from '../data/reqFactory'
import {expirationCheck} from '../helpers/expirationCheck'
import {fetchArticles} from '../helpers/fetchNewArticles'
import fetch, {Request} from 'node-fetch'
// import '../styles/news.css'

export default function News() {
   const [myNewsOptions] = useState({
      ...JSON.parse(window.localStorage.getItem('myNewsOptions'))
   })
   const [myRequests, setMyRequests] = useState([])
   const [myResponses, setMyResponses] = useState([])
   const [isExpired, setIsExpired] = useState(null)
   const [dbObject, setDbObject] = useState(null)

   useEffect(() => {
      if (expirationCheck(JSON.stringify(myNewsOptions.expires))) {
         setIsExpired(true)
         setMyRequests(createRequests(myNewsOptions))
      } else {
         setIsExpired(false)
      }
   }, [])

   useEffect(() => {
      if (isExpired) {
         const articles = fetchArticles(myRequests)
         articles.then((data) => {
            setMyResponses(data)
            setDbObject({
               method: 'POST',
               headers: new Headers({
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
               }),
               body: JSON.stringify({
                  newsId: myNewsOptions.id,
                  articles: data
               })
            })
         })
      }
   }, [isExpired])

   useEffect(() => {
      if (dbObject !== null && myResponses.length !== 0) {
         fetch(new Request('http://localhost:9000/mynews/upload', dbObject))
      }
   }, [dbObject])

   const newsScreen =
      myResponses.length === 0 ? (
         <div id='loading-widget'>Loading...</div>
      ) : (
         <React.Fragment>
            <Header />
            <div>Check console for now</div>
            <Footer />
         </React.Fragment>
      )

   return newsScreen
}
