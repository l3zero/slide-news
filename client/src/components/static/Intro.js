import React from 'react'
import {Link} from 'react-router-dom'
import '../../styles/intro.css'

export default function Intro() {
   return (
      <div id='slide-hero'>
         <Link to='/customize'>Let's Slide</Link>
         <img src={require('../../img/slide.svg')} width='80px' height='80px' alt='' />
      </div>
   )
}
