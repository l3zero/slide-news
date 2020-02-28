import React, {useState, useContext, useEffect, useCallback, useMemo} from 'react'
import {Link} from 'react-router-dom'
import '../styles/header.css'

export default function Header() {
   return (
      <header>
         <h1>
            <Link to='/'>Slide News</Link>
         </h1>
      </header>
   )
}
