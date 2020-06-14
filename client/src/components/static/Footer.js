import React from 'react'
import '../../styles/footer.css'

export default function Footer() {
   return (
      <footer>
         <div id='about-row'>
            <a href='https://github.com/kRyM1337/slide-news#slide' rel='noopener noreferer'>
               About
            </a>{' '}
            <a href='https://github.com/kRyM1337/slide-news' rel='noopener noreferer'>
               Github
            </a>{' '}
            <a href='mailto:krym.is.truth@gmail.com?Subject=Hello'>Contact</a>{' '}
         </div>

         <div id='powered-by'>
            Powered by <img src={require('../../img/devto.png')} alt='' /> V.1.0
         </div>
         <div id='icons-by'>
            Icons by{' '}
            <a href='https://www.flaticon.com/authors/freepik' title='Freepik'>
               Freepik
            </a>{' '}
         </div>
      </footer>
   )
}
