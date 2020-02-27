import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import Intro from './Intro'
const moment = require('moment')

export class MainApp extends Component {
   constructor(props) {
      super(props)
      this.state = {}
   }

   render() {
      return (
         <React.Fragment>
            <Header />
            <Intro />
            <Footer />
         </React.Fragment>
      )
   }
}

export default MainApp
