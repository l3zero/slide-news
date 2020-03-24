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
   // const [myResponses, setMyResponses] = useState(getResponses(myRequests))

   return (
      <React.Fragment>
         <Header />
         <div>Here is the news component: {JSON.stringify(myNews)}</div>
         <div>Here is the request array:{JSON.stringify(myRequests)}</div>
         <div>Here is the response array: {JSON.stringify(getResponses(myRequests))}</div>
         <Footer />
      </React.Fragment>
   )
}
