/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import {createRequests} from '../data/reqFactory'
import {getResponses} from '../helpers/apiHandler'
// import '../styles/news.css'

export default function News() {
   const [myNews] = useState({
      ...JSON.parse(window.localStorage.getItem('myNews'))
   })

   const [myRequests] = useState(createRequests(myNews))
   const [myResponses, setMyResponses] = useState([])

   useEffect(() => {
      //@TODO This will be changed to be based on 'myInterval'value. Should only run fresh fetch if the interval value + createDate is past the current date (use moment.js)

      //Grab API responses once requests are loaded
      let temp = []
      const promResponses = getResponses(myRequests)
      // promResponses.map((p) =>
      //    p.then((result) => {
      //       console.log(result)
      //       temp = temp.concat(result)
      //       setMyResponses(temp)
      //    })
      // )
      // setMyResponses(promResponses)
   }, [])

   let newsScreen =
      myResponses.length === 0 ? (
         <div id='loading-widget'>Loading...</div>
      ) : (
         <React.Fragment>
            <Header />
            <div>Here is the news component: {JSON.stringify(myNews)}</div>
            <div>Here is the request array:{JSON.stringify(myRequests)}</div>
            <div>Here is the responses: </div>
            <Footer />
         </React.Fragment>
      )

   return newsScreen
}
