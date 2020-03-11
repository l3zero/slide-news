import React, {useState, useContext, useEffect, useCallback, useMemo} from 'react'
import {Link} from 'react-router-dom'
import Header from './static/Header'
import Footer from './static/Footer'
// import '../styles/news.css'

export default function News(props) {
   const [myOptions, setMyOptions] = useState({})

   useEffect(() => {
      // eslint-disable-next-line react/prop-types
      setMyOptions(props.location.state.options)
   }, [])
   return (
      <React.Fragment>
         <Header />
         <div>Here is the news component: {JSON.stringify(myOptions)}</div>
         <Footer />
      </React.Fragment>
   )
}
