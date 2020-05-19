/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import Article from './static/Article.js'
import {createRequests} from '../data/reqFactory'
import {expirationCheck} from '../helpers/expirationCheck'
import {fetchArticles} from '../helpers/fetchNewArticles'
import {urlToId} from '../helpers/urlConverter'
import {httpInits} from '../data/mongoHttpObj'
import fetch, {Request} from 'node-fetch'
import '../styles/news.css'

//@TO-DO Handle 404s from DB side
//@TO-DO Update options obj with new expiration date
//@TO-DO Update localhost:9000 with dynamic version - can't go live without this
//@TO-DO Add -moz versions to css for /customize
//@TO-DO Add route checking to /customize - CANNOT GO HERE IF ID already exists, should only go to /news
//@TO-DO Figure out why HackerNews is not working with fetchArticles...articles are being loaded way after the return occurs.

export default function News(props) {
   const [myNewsOptions] = useState({
      ...JSON.parse(window.localStorage.getItem('myNewsOptions'))
   })
   // const [myRequests, setMyRequests] = useState([])
   const [myResponses, setMyResponses] = useState(null)

   const [isExpired, setIsExpired] = useState(false)
   const [firstTime, setFirstTime] = useState(JSON.parse(window.localStorage.getItem('firstTime')))

   const [dbUpdateObj, setDbUpdateObj] = useState(null)
   const [dbCreateObj, setDbCreateObj] = useState(null)
   const [dbReadObj, setDbReadObj] = useState(null)

   let intervalCounter = 1

   //Initial checks for grabbing updated news
   useEffect(() => {
      const reqs = createRequests(myNewsOptions)
      if (firstTime) {
         console.log('1st time Fetching -> Setting state -> sending to DB -> setting 1st time to false')
         // setFirstTime(true)
         const articles = fetchArticles(reqs)
         articles.then((data) => {
            console.log('setting db create obj')
            setMyResponses(data)
            setDbCreateObj(httpInits(data).CREATE)
         })
         // setMyRequests(reqs)
         window.localStorage.setItem('firstTime', JSON.stringify(false))
      } else {
         if (expirationCheck(JSON.stringify(myNewsOptions.expires))) {
            console.log(
               'Expired confirmed -> fetching -> setting state -> sending updated news to DB -> setting expired to false -> updating local and state with new expiration date'
            )
            const articles = fetchArticles(reqs)
            articles.then((data) => {
               console.log('setting db update obj')
               setMyResponses(data)
               setDbUpdateObj(httpInits(data).UPDATE)
            })
            setIsExpired(false)
            // setMyRequests(reqs)
         } else {
            console.log('not first time, not expired, setting db read obj')
            setDbReadObj(httpInits().READ)
         }
      }

      return () => {
         setIsExpired(false)
         setFirstTime(null)
         setMyResponses(null)
      }
   }, [])

   //Updating DB object
   useEffect(() => {
      if (dbUpdateObj !== null && myResponses !== null) {
         console.log('sending updated news to DB')
         fetch(new Request(`http://localhost:9000/mynews/update/${myNewsOptions.id}`, dbUpdateObj))
      }
      return () => {
         setDbUpdateObj(null)
      }
   }, [dbUpdateObj])

   //Creating DB object
   useEffect(() => {
      if (dbCreateObj !== null && myResponses !== null && myResponses !== undefined && myResponses.length !== 0) {
         console.log('sending new news to DB')
         fetch(new Request(`http://localhost:9000/mynews/upload/${myNewsOptions.id}`, dbCreateObj))
      }
      return () => {
         setDbCreateObj(null)
      }
   }, [dbCreateObj])

   //Fetching existing DB object & updating local state
   useEffect(() => {
      if (dbReadObj !== null) {
         console.log('grabbing existing news from DB')
         fetch(new Request(`http://localhost:9000/mynews/id/${myNewsOptions.id}`, dbReadObj))
            .then((raw) => raw.json())
            .then((json) => {
               setMyResponses(json.data)
            })
      }
      return () => {
         setDbReadObj(null)
      }
   }, [dbReadObj])

   //Setting timer for auto-scroll
   useEffect(() => {
      // const interval = 123
      // if (myResponses !== null && myResponses !== undefined && myResponses.length !== 0) {
      const interval = setInterval(scrollToNextArticle, 4000)
      // }
      return () => clearInterval(interval)
   }, [])

   const newsScreen =
      myResponses === null || myResponses === undefined || myResponses.length === 0 ? (
         <div id='loading-widget'>Loading...</div>
      ) : (
         <React.Fragment>
            <Header />
            <main id='news-scroller'>
               {myResponses.map((article) => (
                  <Article
                     title={article.title}
                     url={article.url}
                     image={article.imageUrl}
                     key={urlToId(article.url)}
                     id={urlToId(article.url)}
                  />
               ))}
            </main>
            <Footer />
         </React.Fragment>
      )

   return newsScreen

   function scrollToNextArticle() {
      const matches = document.querySelectorAll('div.article-container')
      const loc = document.location.toString().split('#')[0]
      document.location = `${loc}#${matches[intervalCounter].id}`
      if (intervalCounter < matches.length - 1) {
         intervalCounter++
      } else {
         intervalCounter = 0
      }
   }
}
