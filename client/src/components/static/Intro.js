import React from 'react'
import {Link} from 'react-router-dom'
import '../../styles/intro.css'

export default function Intro() {
   return (
      <div id='slide-hero'>
         <Link to='/customize'>
            <img src={require('../../img/slide.svg')} alt='' />
         </Link>
      </div>
   )
}
