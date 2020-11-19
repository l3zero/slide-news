import React from 'react'
import {Link} from 'react-router-dom'
import '../../styles/header.css'

export default function Header() {
   return (
      <header>
         <div>
            <Link to='/'>
               <span id='title'>Slide</span>
            </Link>
            {/* <span id='sub-title'>Web Dev News</span> */}
         </div>
      </header>
   )
}
