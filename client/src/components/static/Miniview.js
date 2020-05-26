import React from 'react'
import '../../styles/miniview.css'

export default function Miniview(props) {
   return (
      <div className='menu-container'>
         <img id='menu-slide' src={require('../../img/slide.svg')} alt='' />
         <div className='menu-content'>
            <div id='menu-articles'>My Articles</div>
            <div id='menu-clear'>Clear Options</div>
         </div>
      </div>
   )
}
