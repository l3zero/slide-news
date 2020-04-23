import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import TopicsCheckbox from './static/TopicsCheckbox.js'
import SourcesCheckbox from './static/SourcesCheckbox.js'
import RefreshIntervals from './static/RefreshIntervals.js'
import {updateMyNews} from '../data/myNewsOptions.js'
import {lsTest} from '../helpers/storageCheck.js'
// import '../styles/customize.css'

export default function Customize(props) {
   const [myOptions, setMyOptions] = useState({...props.initNews})

   useEffect(() => {
      browserSet()
   }, [myOptions])

   return (
      <React.Fragment>
         <Header />
         <TopicsCheckbox handler={setTopics} />
         <SourcesCheckbox handler={setSources} />
         <RefreshIntervals handler={setInterval} />
         <Link to='/news' firstTime={true}>
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
      const finalOptions = {
         ...myOptions,
         myInterval: arr
      }
      setMyOptions({...updateMyNews(finalOptions)})
   }

   function browserSet() {
      if (Object.keys(myOptions).length !== 0) {
         lsTest()
            ? window.localStorage.setItem('myNewsOptions', JSON.stringify(myOptions))
            : alert("Please enable your web browser's local storage to use this app!")
      }
   }
}
