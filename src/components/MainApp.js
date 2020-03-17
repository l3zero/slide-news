import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import Intro from './static/Intro.js'
import News from './News.js'
import Customize from './Customize.js'
import {lsTest} from '../helpers/storageCheck.js'
// const moment = require('moment')

class MainApp extends Component {
   constructor(props) {
      super(props)
      this.state = {newUser: true}
   }

   //Will need to update this to use the DB instead
   componentDidMount() {
      if (lsTest() && localCheck()) {
         this.setState({
            newUser: false
         })
      }
   }

   render() {
      return (
         <Router forceRefresh={true}>
            <Switch>
               <Route exact path='/'>
                  {!this.state.newUser ? <Redirect exact from='/' to='/news' /> : <Home />}
               </Route>
               <Route exact path='/customize'>
                  {!this.state.newUser ? <Redirect exact from='/customize' to='/news' /> : <Customize />}
               </Route>
               <Route exact path='/news'>
                  {localCheck() ? <News /> : <Redirect exact from='/news' to='/' />}
               </Route>
            </Switch>
         </Router>
      )
   }
}

const Home = () => (
   <React.Fragment>
      <Header />
      <Intro />
      <Footer />
   </React.Fragment>
)
function localCheck() {
   if (window.localStorage.getItem('myNews') === null) {
      return false
   }
   return true
}

export default MainApp
