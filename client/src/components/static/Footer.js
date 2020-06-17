import '../../styles/footer.css'
import React from 'react'

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
            <a href='mailto:krym.is.truth@gmail.com?Subject=Hello' rel='noopener noreferer'>
               Contact
            </a>{' '}
         </div>

         <div id='powered-by'>
            Powered by <img src={require('../../img/devto.png')} alt='' /> V.1.0
         </div>
         <div id='icons-by'>
            Icons by{' '}
            <a href='https://www.flaticon.com/authors/freepik' title='Freepik' rel='noopener noreferer'>
               Freepik
            </a>{' '}
         </div>
      </footer>
   )
}
