import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import Intro from './Intro'
import {BrowserRouter as Router, Link, Switch, Route, Redirect} from 'react-router-dom'
// const moment = require('moment')

export class MainApp extends Component {
   constructor(props) {
      super(props)
      this.state = {newUser: true}
   }

   render() {
      return (
         <Router>
            <Switch>
               <Route exact path='/'>
                  {!this.state.newUser ? <Redirect exact from='/' to='/news' /> : <Home />}
               </Route>
               <Route exact path='/customize' component={Customize} />
               <Route exact path='/news' component={News} />
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

const Customize = () => (
   <React.Fragment>
      <Header />
      <Footer />
   </React.Fragment>
)

const News = () => (
   <React.Fragment>
      <Header />
      <div>Will add main news component here</div>
      <Footer />
   </React.Fragment>
)

export default MainApp
