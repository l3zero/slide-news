/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
// import '../styles/news.css'

export default function News() {
   const [myNews, setMyNews] = useState({
      ...JSON.parse(window.localStorage.getItem('myNews'))
   })

   return (
      <React.Fragment>
         <Header />
         <div>Here is the news component: {JSON.stringify(myNews)}</div>
         <div>Here is the dev.api return info:</div>
         <Footer />
      </React.Fragment>
   )
}
