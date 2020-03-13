/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Header from './static/Header'
import Footer from './static/Footer'
import {updateMyNews} from '../data/myNewsInit'
import {lsTest} from '../helpers/localStorager'

// import '../styles/news.css'

export default function News(props) {
   const [myNews, setMyNews] = useState({})

   useEffect(() => {
      let opts =
         props.location.state === undefined
            ? {}
            : {...props.location.state.options, ...updateMyNews(props.location.state.options)}
      setMyNews(opts)
   }, [])

   return (
      <React.Fragment>
         <Header />
         <div>Here is the news component: {JSON.stringify(myNews)}</div>
         <div>Here is the dev.api return info:</div>
         <Footer />
      </React.Fragment>
   )

   function localCheck() {
      lsTest()
         ? window.localStorage.setItem('myNews', JSON.stringify(myNews))
         : alert("Please enable your web browser's local storage to use this app!")
   }
}

//Need to figure out how to prevent from going to news if no news obj exists
// Object.keys(myNews).length === 0 ? (
//    <Redirect exact from='/news' to='/' />
// ) :
