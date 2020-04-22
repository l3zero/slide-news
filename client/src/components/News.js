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

/*TODO Fix error for Patch request: 'Cast to ObjectId failed for value "{ newsId: \'asdf\' }" at path "_id" for model "newsdumps"',
  name: 'CastError',
  messageFormat: undefined,
  stringValue: '"{ newsId: \'asdf\' }"',
  kind: undefined,
  value: { newsId: 'asdf' },
  path: '_id',
*/

export default function News() {
   const [myNewsOptions] = useState({
      ...JSON.parse(window.localStorage.getItem('myNewsOptions'))
   })
   const [myRequests, setMyRequests] = useState([])
   const [myResponses, setMyResponses] = useState(null)
   const [isExpired, setIsExpired] = useState(null)
   const [dbUpdateObj, setDbUpdateObj] = useState(null)
   const [dbCreateObj, setDbCreateObj] = useState(null)

   useEffect(() => {
      if (expirationCheck(JSON.stringify(myNewsOptions.expires))) {
         setIsExpired(true)
         setMyRequests(createRequests(myNewsOptions))
      } else {
         setIsExpired(false)
      }
      return () => {
         setIsExpired(null)
      }
   }, [])

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

   useEffect(() => {
      if (dbUpdateObj !== null && myResponses.length !== 0) {
         fetch(new Request(`http://localhost:9000/mynews/update/${myNewsOptions.id}`, dbUpdateObj))
      }
      return () => {
         setDbUpdateObj(null)
      }
   }, [dbUpdateObj])

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
