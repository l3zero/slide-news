/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import {createRequests} from '../data/reqFactory'
// import '../styles/news.css'

export default function News() {
   const [myNews, setMyNews] = useState({
      ...JSON.parse(window.localStorage.getItem('myNews'))
   })

   const [myRequests, setMyRequests] = useState(createRequests(myNews))

   return (
      <React.Fragment>
         <Header />
         <div>Here is the news component: {JSON.stringify(myNews)}</div>
         <div>Here is the dev.api return info:{JSON.stringify(myRequests)}</div>
         <Footer />
      </React.Fragment>
   )
}
