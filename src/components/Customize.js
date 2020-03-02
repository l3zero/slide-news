import React, {useState, useEffect} from 'react'
import Header from './static/Header'
import Footer from './static/Footer'
import TopicsCheckbox from './static/TopicsCheckbox'
import SourcesCheckbox from './static/SourcesCheckbox'
// import '../styles/customize.css'

export default function Customize() {
   const [topics, setTopics] = useState([])
   //Testing useEffect
   useEffect(() => {
      console.log(topics)
   }, [topics])

   return (
      <React.Fragment>
         <Header />
         <TopicsCheckbox handler={getArray} />
         <SourcesCheckbox handler={getArray} />
         <Footer />
      </React.Fragment>
   )

   function getArray(arr) {
      setTopics(arr)
   }
}
