import React, {useState, useContext, useEffect, useCallback, useMemo} from 'react'
import {Link} from 'react-router-dom'
import Header from './static/Header'
import Footer from './static/Footer'
// import '../styles/news.css'

export default function News() {
   const [myOptions, setMyOptions] = useState(window.localStorage.getItem('test'))

   useEffect(() => {
      console.log(myOptions)
   }, [myOptions])
   return (
      <React.Fragment>
         <Header />
         <div>Here is the news component</div>
         {myOptions}
         <Footer />
      </React.Fragment>
   )
}
