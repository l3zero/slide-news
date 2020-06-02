import React, {Component} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Header from './static/Header.js'
import Footer from './static/Footer.js'
import Intro from './static/Intro.js'
import News from './News.js'
import Customize from './Customize.js'
import {gsap} from 'gsap'

//@TO-DO make redirects carry a message about why it's being redirected

class MainApp extends Component {
   componentDidMount() {
      let tl = gsap.timeline({
         // delay: 0.2,
         paused: false, // default is false
         repeat: 1, // number of repeats (-1 for infinite)
         // repeatDelay: 1, // seconds between repeats
         // repeatRefresh: true, // invalidates on each repeat
         yoyo: false, // if true > A-B-B-A, if false > A-B-A-B
         defaults: {
            // children inherit these defaults
            duration: 0.8
         },
         smoothChildTiming: true,
         autoRemoveChildren: true
         // onComplete: myFunc,
         // other callbacks:
         // onStart, onUpdate, onRepeat, onReverseComplete
         // Each callback has a params property as well
         // i.e. onUpdateParams (Array)
      })

      tl.from('header > div', {ease: 'bounce.out', opacity: 0, x: '-100%', delay: 0.3})
         .from('body', {
            backgroundImage: 'none',
            // backgroundPositionY: '100%',
            ease: 'power1.out',
            duration: 1
         })
         .from('footer', {ease: 'power1', y: '1000%', rotate: '270deg'})
         .from('#slide-hero > a', {
            ease: 'power2',
            opacity: 0,
            x: '1000%'
         })
         .from('#slide-hero > img', {opacity: 0, rotate: '420deg'})
   }
   render() {
      return (
         <Router forceRefresh={true}>
            <Switch>
               <Route exact path='/'>
                  {localCheck() ? <Redirect exact from='/' to='/news' /> : <Home />}
               </Route>
               <Route exact path='/customize' component={Customize}>
                  {localCheck() ? <Redirect exact from='/customize' to='/news' /> : <Customize />}
               </Route>
               <Route exact path='/news' component={News}>
                  {!localCheck() ? <Redirect exact from='/news' to='/' /> : <News />}
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
   const localOptions = JSON.parse(window.localStorage.getItem('myNewsOptions'))
   if (localOptions === null || localOptions.id === null) {
      return false
   }
   return true
}

export default MainApp
