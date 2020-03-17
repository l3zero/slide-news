import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import News from './News.js'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import TopicsCheckbox from './static/TopicsCheckbox.js'
import SourcesCheckbox from './static/SourcesCheckbox.js'
import RefreshIntervals from './static/RefreshIntervals.js'
import {lsTest} from '../helpers/storageCheck.js'
// import '../styles/customize.css'

export default function Customize() {
   const [myOptions, setMyOptions] = useState({})

   useEffect(() => {
      browserSet()
   }, [myOptions])

   return (
      <React.Fragment>
         <Header />
         <TopicsCheckbox handler={setTopics} />
         <SourcesCheckbox handler={setSources} />
         <RefreshIntervals handler={setInterval} />
         <Link to='/news'>
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

   function browserSet() {
      if (Object.keys(myOptions).length !== 0) {
         lsTest()
            ? window.localStorage.setItem('myNews', JSON.stringify(myOptions))
            : alert("Please enable your web browser's local storage to use this app!")
      }
   }
}
