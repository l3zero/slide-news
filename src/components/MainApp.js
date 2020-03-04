import React, {Component} from 'react'
import Header from './static/Header'
import Footer from './static/Footer'
import Intro from './static/Intro'
import News from './News'
import Customize from './Customize'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
// const moment = require('moment')

class MainApp extends Component {
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

export default MainApp
