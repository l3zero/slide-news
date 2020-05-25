/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import Article from './static/Article.js'
import {createRequests} from '../data/reqFactory'
import {expireCheck, expireUpdate} from '../helpers/expired'
import {checkStatus} from '../helpers/httpStatusCheck'
import {fetchArticles} from '../helpers/fetchNewArticles'
import {urlToId} from '../helpers/urlConverter'
import {httpInits} from '../data/mongoHttpObj'
import fetch, {Request} from 'node-fetch'
import '../styles/news.css'

//@TO-DO Add -moz versions to css for /customize
//@TO-DO Add bookmark button for each image
//@TO-DO Add menu button with view articles, clear options, x

export default function News(props) {
   const [myNewsOptions] = useState({
      ...JSON.parse(window.localStorage.getItem('myNewsOptions'))
   })
   // const [myRequests, setMyRequests] = useState([])
   const [myResponses, setMyResponses] = useState(null)

   // const [isExpired, setIsExpired] = useState(false)
   const [firstTime, setFirstTime] = useState(JSON.parse(window.localStorage.getItem('firstTime')))

   const [dbUpdateObj, setDbUpdateObj] = useState(null)
   const [dbCreateObj, setDbCreateObj] = useState(null)
   const [dbReadObj, setDbReadObj] = useState(null)

   let intervalCounter = 1

   //Initial checks for grabbing updated news
   useEffect(() => {
      const reqs = createRequests(myNewsOptions)
      if (firstTime) {
         // console.log('1st time Fetching -> Setting state -> sending to DB -> setting 1st time to false')
         // setFirstTime(true)
         const articles = fetchArticles(reqs)
         articles.then((data) => {
            if (data.length === 0) {
               window.localStorage.removeItem('myNewsOptions')
               window.localStorage.removeItem('firstTime')
               alert('There are no articles available with your criteria! Please start a fresh search')
               document.location.replace('/customize')
            } else {
               // console.log('setting db create obj')
               setMyResponses(data)
               setDbCreateObj(httpInits(data).CREATE)
            }
         })
         // setMyRequests(reqs)
         window.localStorage.setItem('firstTime', JSON.stringify(false))
      } else {
         if (expireCheck(JSON.stringify(myNewsOptions.expires))) {
            // console.log(
            //    'Expired confirmed -> fetching -> setting state -> sending updated news to DB -> setting expired to false -> updating local and state with new expiration date'
            // )
            const articles = fetchArticles(reqs)
            articles.then((data) => {
               if (data.length === 0) {
                  // window.localStorage.removeItem('myNewsOptions')
                  // window.localStorage.removeItem('firstTime')
                  JSON.parse(window.localStorage.getItem('myNewsOptions')).expires = expireUpdate(
                     myNewsOptions.myInterval[0].value
                  )
                  setDbReadObj(httpInits().READ)
                  alert('There are no new articles available with your criteria! Loading old articles..')
                  document.location.reload()
               } else {
                  // console.log('setting db update obj')
                  setMyResponses(data)
                  setDbUpdateObj(httpInits(data).UPDATE)
               }
            })
            // setIsExpired(false)
            // setMyRequests(reqs)
         } else {
            // console.log('not first time, not expired, setting db read obj')
            setDbReadObj(httpInits().READ)
         }
      }

      return () => {
         // setIsExpired(false)
         setFirstTime(null)
         setMyResponses(null)
      }
   }, [])

   //Updating DB object
   useEffect(() => {
      if (dbUpdateObj !== null && myResponses !== null) {
         console.log('sending updated news to DB')
         fetch(new Request(`${window.location.origin}/mynews/update/${myNewsOptions.id}`, dbUpdateObj))
      }
      return () => {
         setDbUpdateObj(null)
      }
   }, [dbUpdateObj])

   //Creating DB object
   useEffect(() => {
      if (dbCreateObj !== null && myResponses !== null && myResponses !== undefined && myResponses.length !== 0) {
         console.log('sending fresh news to DB')
         fetch(new Request(`${window.location.origin}/mynews/upload/${myNewsOptions.id}`, dbCreateObj))
      }
      return () => {
         setDbCreateObj(null)
      }
   }, [dbCreateObj])

   //Fetching existing DB object & updating local state
   useEffect(() => {
      if (dbReadObj !== null) {
         console.log('grabbing existing news from DB')
         fetch(new Request(`${window.location.origin}/mynews/id/${myNewsOptions.id}`, dbReadObj))
            .then(checkStatus)
            .then((raw) => raw.json())
            .then((json) => {
               setMyResponses(json.data)
            })
            .catch((err) => {
               window.localStorage.removeItem('myNewsOptions')
               window.localStorage.removeItem('firstTime')
               alert('No articles exist in DB with your ID. Please start a fresh search.')
               document.location.replace('/customize')
            })
      }
      return () => {
         setDbReadObj(null)
      }
   }, [dbReadObj])

   //Setting timer for auto-scroll
   useEffect(() => {
      // if (myResponses !== null && myResponses !== undefined && myResponses.length !== 0) {
      const interval = setInterval(scrollToNextArticle, 6000)
      // }
      return () => clearInterval(interval)
   }, [myResponses])

   const newsScreen =
      myResponses === null || myResponses === undefined || myResponses.length === 0 ? (
         <div id='loading-widget'>Loading...</div>
      ) : (
         <React.Fragment>
            <Header />
            <img id='menu-slide' src={require('../img/slide.svg')} alt='' />
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
      if (matches !== undefined) {
         document.location = `${loc}#${matches[intervalCounter].id}`
         intervalCounter < matches.length - 1 ? intervalCounter++ : (intervalCounter = 0)
      }
   }
}
