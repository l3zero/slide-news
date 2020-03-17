/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import {updateMyNews} from '../data/myNewsInit.js'
import {lsTest} from '../helpers/storageCheck.js'

// import '../styles/news.css'

export default function News(props) {
   const [myNews, setMyNews] = useState({
      ...JSON.parse(window.localStorage.getItem('myNews')),
      ...updateMyNews(JSON.parse(window.localStorage.getItem('myNews')))
   })

   useEffect(() => {
      // const initOpts = window.localStorage.getItem('myNews')
      // const finalOpts = myNews === null ? {} : {...myNews, ...updateMyNews(myNews)}
      // setMyNews(finalOpts)
      browserSet(myNews)
   }, [])

   return (
      <React.Fragment>
         <Header />
         <div>Here is the news component: {JSON.stringify(myNews)}</div>
         <div>Here is the dev.api return info:</div>
         <Footer />
      </React.Fragment>
   )

   function browserSet(opts) {
      lsTest()
         ? window.localStorage.setItem('myNews', JSON.stringify(opts))
         : alert("Please enable your web browser's local storage to use this app!")
   }
}
