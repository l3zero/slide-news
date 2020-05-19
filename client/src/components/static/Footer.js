import React from 'react'
import '../../styles/footer.css'

export default function Footer() {
   return (
      <footer>
         <div id='about-row'>
            <a className='footer-link'>About</a>{' '}
            <a className='footer-link' href='https://github.com/kRyM1337/slide-news' rel='noopener noreferer'>
               Github
            </a>{' '}
            <a className='footer-link'>Contact</a>
         </div>

         <div id='powered-by'>
            Powered by <img src={require('../../img/devto.png')} /> V.1.0
         </div>
         <div id='icons-attribution'>
            Icons by{' '}
            <a href='https://www.flaticon.com/authors/freepik' title='Freepik'>
               Freepik
            </a>{' '}
         </div>
      </footer>
   )
}
