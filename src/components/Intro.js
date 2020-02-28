import React, {useState, useContext, useEffect, useCallback, useMemo} from 'react'
import {Link} from 'react-router-dom'
import '../styles/intro.css'

export default function Intro() {
   return (
      <div>
         <Link to='/customize'>Customize your news...</Link>
      </div>
   )
}
