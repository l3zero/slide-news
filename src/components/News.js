/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import {createRequests} from '../data/reqFactory'
import {getResponses} from '../helpers/apiHandler'
// import '../styles/news.css'

export default function News() {
   const [myNews, setMyNews] = useState({
      ...JSON.parse(window.localStorage.getItem('myNews'))
   })

   const [myRequests, setMyRequests] = useState(createRequests(myNews))
   const [myResponses, setMyResponses] = useState([])

   useEffect(() => {
      //Grab API responses once requests are loaded
      async function fetcher() {
         const results = await getResponses(myRequests)[0]
         //Not sure why this is happening, but length of array is 0 even though there are 10 items in it..need to debug@@
         results.unshift({})
         setMyResponses(results)
      }

      fetcher()
   }, [])

   let newsScreen =
      myResponses.length === 0 ? (
         <div id='loading-widget'>Loading...</div>
      ) : (
         <React.Fragment>
            <Header />
            <div>Here is the news component: {JSON.stringify(myNews)}</div>
            <div>Here is the request array:{JSON.stringify(myRequests)}</div>
            <div>Here is the responses: {console.log(myResponses)}</div>
            <Footer />
         </React.Fragment>
      )

   return newsScreen
}
