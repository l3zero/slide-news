import React from 'react'
import {Link} from 'react-router-dom'
import '../../styles/header.css'

export default function Header() {
   return (
      <header>
         <div>
            <Link to='/'>
               <span id='title-S'>S</span>
               <span id='title-l'>l</span>
               <span id='title-i'>i</span>
               <span id='title-d'>d</span>
               <span id='title-e'>e</span>
               {'    '}
               <span id='title-N'>N</span>
               <span id='title-e'>e</span>
               <span id='title-w'>w</span>
               <span id='title-s'>s</span>
            </Link>
         </div>
      </header>
   )
}
