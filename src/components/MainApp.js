import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import Intro from './static/Intro.js'
import News from './News.js'
import Customize from './Customize.js'
import {initMyNews} from '../data/myNews.js'
// const moment = require('moment')

//@TO-DO Make sure to change final validation check against DB, specifically for allowing access to customize and news. Should NOT be based on local storage

class MainApp extends Component {
   constructor(props) {
      super(props)
      this.state = {myNewsInit: initMyNews()}
   }

   //Will need to update this to use the DB instead
   componentDidMount() {
      // if (lsTest() && localCheck()) {
      //    this.setState({
      //       newUser: false
      //    })
      // }
   }

   render() {
      return (
         <Router forceRefresh={true}>
            <Switch>
               <Route exact path='/'>
                  {localCheck() ? <Redirect exact from='/' to='/news' /> : <Home />}
               </Route>
               <Route exact path='/customize'>
                  {localCheck() ? (
                     <Redirect exact from='/customize' to='/news' />
                  ) : (
                     <Customize initNews={this.state.myNewsInit} />
                  )}
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
