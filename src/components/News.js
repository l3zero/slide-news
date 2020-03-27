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
   const [myResponses, setMyResponses] = useState(new Array())

   useEffect(() => {
      //Grab API responses once requests are loaded
      async function fetcher() {
         let result = []
         const promiseArray = await getResponses(myRequests)[0]

         promiseArray.map(async (data) => {
            let temp = await data
            result = result.concat(temp)
            setMyResponses(result)
         })
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
            <div>{console.log(myResponses)}</div>
            <Footer />
         </React.Fragment>
      )

   return newsScreen
}
