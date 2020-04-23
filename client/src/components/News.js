/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import {createRequests} from '../data/reqFactory'
import {expirationCheck} from '../helpers/expirationCheck'
import {fetchArticles} from '../helpers/fetchNewArticles'
import {httpInits} from '../data/mongoHttpObj'
import fetch, {Request} from 'node-fetch'
// import '../styles/news.css'

export default function News(props) {
   const [myNewsOptions] = useState({
      ...JSON.parse(window.localStorage.getItem('myNewsOptions'))
   })
   const [myRequests, setMyRequests] = useState([])
   const [myResponses, setMyResponses] = useState(null)

   const [isExpired, setIsExpired] = useState(false)
   const [firstTime, setFirstTime] = useState(null)
   const [dbUpdateObj, setDbUpdateObj] = useState(null)
   const [dbCreateObj, setDbCreateObj] = useState(null)
   const [dbReadObj, setDbReadObj] = useState(null)

   //Initial checks for grabbing updated news
   useEffect(() => {
      if (props.firstTime) {
         setFirstTime(true)
         setMyRequests(createRequests(myNewsOptions))
      } else {
         if (expirationCheck(JSON.stringify(myNewsOptions.expires))) {
            setIsExpired(true)
            setMyRequests(createRequests(myNewsOptions))
         }
      }

      return () => {
         setIsExpired(false)
         setFirstTime(null)
      }
   }, [])

   //Checking for expired articles
   useEffect(() => {
      if (isExpired) {
         const articles = fetchArticles(myRequests)
         articles.then((data) => {
            setMyResponses(data)
            setDbUpdateObj(httpInits(data).UPDATE)
         })
      }
      /*return () => {
         setMyResponses(null)
      }*/
   }, [isExpired])

   //Checking for first time fetching
   useEffect(() => {
      if (firstTime) {
         const articles = fetchArticles(myRequests)
         articles.then((data) => {
            setMyResponses(data)
            setDbCreateObj(httpInits(data).CREATE)
         })
      } else if (!firstTime && !isExpired) {
         setDbReadObj(httpInits().READ)
      }
      /*return () => {
         setMyResponses(null)
      }*/
   }, [firstTime])

   //Updating DB object
   useEffect(() => {
      if (dbUpdateObj !== null && myResponses.length !== 0) {
         fetch(new Request(`http://localhost:9000/mynews/update/${myNewsOptions.id}`, dbUpdateObj))
      }
      return () => {
         setDbUpdateObj(null)
      }
   }, [dbUpdateObj])

   //Creating DB object
   useEffect(() => {
      if (dbCreateObj !== null && myResponses.length !== 0) {
         fetch(new Request(`http://localhost:9000/mynews/upload/${myNewsOptions.id}`, dbCreateObj))
      }
      return () => {
         setDbCreateObj(null)
      }
   }, [dbCreateObj])

   //Fetching existing DB object & updating local state
   useEffect(() => {
      if (dbReadObj !== null) {
         fetch(new Request(`http://localhost:9000/mynews/id/${myNewsOptions.id}`, dbReadObj)).then((data) => {
            setMyResponses(data.articles) //@TO-DO Need to test this
         })
      }
      return () => {
         setDbReadObj(null)
      }
   }, [dbReadObj])

   const newsScreen =
      myResponses === null || myResponses.length === 0 ? (
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
