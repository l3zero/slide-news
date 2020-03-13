import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Header from './static/Header'
import Footer from './static/Footer'
import News from './News'
import TopicsCheckbox from './static/TopicsCheckbox'
import SourcesCheckbox from './static/SourcesCheckbox'
import RefreshIntervals from './static/RefreshIntervals'
// import '../styles/customize.css'

export default function Customize() {
   const [myOptions, setMyOptions] = useState({})

   return (
      <React.Fragment>
         <Header />
         <TopicsCheckbox handler={setTopics} />
         <SourcesCheckbox handler={setSources} />
         <RefreshIntervals handler={setInterval} />
         <Link
            to={{
               pathname: '/news',
               state: {
                  options: myOptions
               }
            }}>
            <button className='go'> GO </button>
         </Link>
         <Footer />
      </React.Fragment>
   )

   function setTopics(arr) {
      setMyOptions({...myOptions, myTopics: arr})
   }
   function setSources(arr) {
      setMyOptions({...myOptions, mySources: arr})
   }
   function setInterval(arr) {
      setMyOptions({...myOptions, myInterval: arr})
   }
}
