/* eslint-disable react/prop-types */
import fetch, {Request} from 'node-fetch'
import React, {useState, useEffect} from 'react'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import Article from './static/Article.js'
import Miniview from './Miniview.js'
import {createRequests} from '../data/reqFactory'
import {fetchArticles} from '../helpers/fetchNewArticles'
import {httpInits} from '../data/mongoHttpObj'
import {checkStatus} from '../helpers/httpStatusCheck'
import {expireCheck, expireUpdate} from '../helpers/expired'
import {urlToId} from '../helpers/urlConverter'
import {newFlash} from '../animation/animationController.js'
import '../styles/news.css'

export default function News(props) {
   const [myNewsOptions] = useState({
      ...JSON.parse(window.localStorage.getItem('myNewsOptions'))
   })
   const [myResponses, setMyResponses] = useState(null)
   const [dbUpdateObj, setDbUpdateObj] = useState(null)
   const [dbCreateObj, setDbCreateObj] = useState(null)
   const [dbReadObj, setDbReadObj] = useState(null)

   let intervalCounter = 1

   //Initial checks for grabbing updated news
   useEffect(() => {
      const firstTime = JSON.parse(window.localStorage.getItem('firstTime'))
      const reqs = createRequests(myNewsOptions)
      if (firstTime) {
         const articles = fetchArticles(reqs)

         articles.then((data) => {
            if (data.length === 0) {
               window.localStorage.removeItem('myNewsOptions')
               window.localStorage.removeItem('firstTime')
               alert('There are no articles available with your criteria! Please start a fresh search')
               document.location.replace('/customize')
            } else {
               setMyResponses(data)
               setDbCreateObj(httpInits(data).CREATE)
            }
         })
         window.localStorage.setItem('firstTime', JSON.stringify(false))
      } else {
         if (expireCheck(JSON.stringify(myNewsOptions.expires))) {
            const articles = fetchArticles(reqs)
            articles.then((data) => {
               if (data.length === 0) {
                  JSON.parse(window.localStorage.getItem('myNewsOptions')).expires = expireUpdate(
                     myNewsOptions.myInterval[0].value
                  )
                  setDbReadObj(httpInits().READ)
                  alert('There are no new articles available with your criteria! Loading old articles..')
                  document.location.reload()
               } else {
                  JSON.parse(window.localStorage.getItem('myNewsOptions')).expires = expireUpdate(
                     myNewsOptions.myInterval[0].value
                  )

                  setMyResponses(data)
                  setDbUpdateObj(httpInits(data).UPDATE)
               }
            })
         } else {
            setDbReadObj(httpInits().READ)
         }
      }

      return () => {
         setMyResponses(null)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   //Updating DB object
   useEffect(() => {
      if (dbUpdateObj !== null && myResponses !== null) {
         console.log('sending updated news to DB')
         newFlash('#new-flash')
         fetch(new Request(`/mynews/update/${myNewsOptions.id}`, dbUpdateObj))
      }
      return () => {
         setDbUpdateObj(null)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dbUpdateObj])

   //Creating DB object
   useEffect(() => {
      if (dbCreateObj !== null && myResponses !== null && myResponses !== undefined && myResponses.length !== 0) {
         fetch(new Request(`/mynews/upload/${myNewsOptions.id}`, dbCreateObj))
      }
      return () => {
         setDbCreateObj(null)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dbCreateObj])

   //Fetching existing DB object & updating local state
   useEffect(() => {
      if (dbReadObj !== null) {
         fetch(new Request(`/mynews/id/${myNewsOptions.id}`, dbReadObj))
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dbReadObj])

   //Setting timer for auto-scroll
   useEffect(() => {
      let interval
      if (myResponses !== null && myResponses !== undefined && myResponses.length !== 0) {
         document.getElementById(`${urlToId(myResponses[0].url)}`).style.opacity = 1
         interval = setInterval(scrollToNextArticle, 5000)
      }
      return () => clearInterval(interval)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [myResponses])

   const newsScreen =
      myResponses === null || myResponses === undefined || myResponses.length === 0 ? (
         <img id='loading-widget' src={require('../img/spinner-1.gif')} alt='' />
      ) : (
         <React.Fragment>
            <Header />
            <Miniview
               articles={myResponses}
               options={{text: `${myNewsOptions.myTopics} with an interval of ${myNewsOptions.myInterval[0].name}.`}}
            />
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
            <div id='new-flash'>New!</div>
            <Footer />
         </React.Fragment>
      )

   return newsScreen

   function scrollToNextArticle() {
      const matches = document.querySelectorAll('div.article-container')
      const loc = document.location.toString().split('#')[0]

      if (matches !== undefined) {
         matches[intervalCounter].style.opacity = 1
         document.location.replace(`${loc}#${matches[intervalCounter].id}`)
         intervalCounter < matches.length - 1 ? intervalCounter++ : (intervalCounter = 0)
         matches[intervalCounter].style.opacity = 0
      }
   }
}
