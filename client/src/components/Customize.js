import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import TopicsCheckbox from './static/TopicsCheckbox.js'
import SourcesCheckbox from './static/SourcesCheckbox.js'
import RefreshIntervals from './static/RefreshIntervals.js'
import {updateMyNews, initMyNews} from '../data/myNewsOptions.js'
import {lsTest} from '../helpers/storageCheck.js'
import {gsap} from 'gsap'

import '../styles/customize.css'

export default function Customize(props) {
   const [myOptions, setMyOptions] = useState(initMyNews())

   useEffect(() => {
      browserSet()
   }, [myOptions])
   useEffect(() => {
      let anim = gsap.from('#customize-scroller', {ease: 'elastic.out', opacity: 0, x: '-50%', duration: 1})
      return () => {
         anim.kill()
      }
   }, [])

   return (
      <React.Fragment>
         <Header />
         <main id='customize-scroller'>
            <TopicsCheckbox handler={setTopics} />
            <SourcesCheckbox handler={setSources} />
            <RefreshIntervals handler={setInterval} />
         </main>
         <Link to='/news'>
            <button id='go'> GO </button>
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

      lsTest()
         ? window.localStorage.setItem('firstTime', JSON.stringify(true))
         : alert("Please enable your web browser's local storage to use this app!")
   }
}
