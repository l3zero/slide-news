import React, {useState, useEffect} from 'react'
import Header from './static/Header'
import Footer from './static/Footer'
import TopicsCheckbox from './static/TopicsCheckbox'
import SourcesCheckbox from './static/SourcesCheckbox'
import RefreshIntervals from './static/RefreshIntervals'
import {initNews} from '../data/initNews'
import {formData} from '../data/constData'
// import '../styles/customize.css'

export default function Customize() {
   const [topics, setTopics] = useState([])
   const [sources, setSources] = useState([])
   const [interval, setInterval] = useState('')
   const [options, setOptions] = useState(initNews)

   //Testing useEffect
   useEffect(() => {
      console.log(options)
   }, [options])

   return (
      <React.Fragment>
         <Header />
         <TopicsCheckbox handler={defineTopics} />
         <SourcesCheckbox handler={defineSources} />
         <RefreshIntervals handler={defineInterval} />
         <Footer />
      </React.Fragment>
   )

   function defineTopics(arr) {
      setTopics(arr)
      initNews.topics = arr
      setOptions(initNews)
   }
   function defineSources(arr) {
      setSources(arr)
      //Partial implementation - finish next time and fix options obj
      options.sources = formData.SOURCES.filter((item) => item.name === arr)
   }
   function defineInterval(val) {
      setInterval(val)
      options.interval = val
   }
}
