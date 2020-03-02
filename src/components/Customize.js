import React, {useState, useEffect} from 'react'
import Header from './static/Header'
import Footer from './static/Footer'
import TopicsCheckbox from './static/TopicsCheckbox'
import SourcesCheckbox from './static/SourcesCheckbox'
import RefreshIntervals from './static/RefreshIntervals'
// import '../styles/customize.css'

export default function Customize() {
   const [topics, setTopics] = useState([])
   const [sources, setSources] = useState([])
   const [interval, setInterval] = useState('Once a Week')

   //Testing useEffect
   useEffect(() => {
      console.log(interval)
   }, [interval])

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
   }
   function defineSources(arr) {
      setSources(arr)
   }
   function defineInterval(val) {
      setInterval(val)
   }
}
