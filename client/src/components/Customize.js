import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import TopicsCheckbox from './static/TopicsCheckbox.js'
import RefreshIntervals from './static/RefreshIntervals.js'
import {updateMyNews, initMyNews} from '../data/myNewsOptions.js'
import {lsTest} from '../helpers/storageCheck.js'
import {formData} from '../data/formData.js'
import {editCustomizePage} from '../animation/animationController.js'

import '../styles/customize.css'

export default function Customize(props) {
   const [myOptions, setMyOptions] = useState(initMyNews())
   const [animCount, setAnimCount] = useState(0)

   useEffect(() => {
      browserSet()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [myOptions])
   useEffect(() => {
      if (animCount < 2) {
         editCustomizePage('#customize-scroller')
      }
      return () => {
         // anim.kill()
      }
   }, [animCount])

   return (
      <React.Fragment>
         <Header />
         <main id='customize-scroller'>
            <TopicsCheckbox handler={setTopics} />
            <RefreshIntervals handler={setInterval} />
         </main>
         <Link to='/news'>
            <button id='go'> GO </button>
         </Link>
         <Footer />
      </React.Fragment>
   )

   function setTopics(arr) {
      setMyOptions({...myOptions, myTopics: arr, mySources: [formData.SOURCES[0]]})
      setAnimCount(animCount + 1)
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

      window.localStorage.setItem('firstTime', JSON.stringify(true))
   }
}
