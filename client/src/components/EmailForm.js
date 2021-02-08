import React from 'react'
import emailjs from 'emailjs-com'
import moment from 'moment'
import {emailVal} from '../helpers/validation.js'
import '../styles/emailForm.css'
import {sortArticles} from '../helpers/sort.js'

export default function EmailForm(props) {
   function handleEmailSubmit(e) {
      e.preventDefault()

      if (emailVal(document.querySelector('#email-input').value)) {
         let msg = sortArticles(props.articles)
            .map(
               (article) => `${article.title}:
         ${article.url}`
            )
            .join('<br></br>')

         let email = {
            from_name: 'Slide News',
            to_name: document.querySelector('#email-input').value,
            message_html: msg,
            current_date: moment().format('LLLL')
         }

         emailjs
            .send(
               process.env['REACT_APP_SERVICE_ID'],
               process.env['REACT_APP_EMAIL_TEMPLATE'],
               email,
               process.env['REACT_APP_EMAIL_ID']
            )
            .then(
               (result) => {
                  alert('Check your inbox and/or spam folder for your articles!')
                  closeEmailForm()
               },
               (error) => {
                  console.error(error.text)
               }
            )
      } else {
         alert('Enter a valid email!')
      }
   }

   return (
      <div id='email-form'>
         <span className='close' onClick={closeEmailForm}>
            &times;
         </span>
         <span>Get your articles delivered to your inbox!</span>
         <form onSubmit={handleEmailSubmit}>
            <input id='email-input' type='text' name='emailAddress' placeholder='Enter your email...' />
            <input id='email-submit' type='submit' value='Send my news!' />
         </form>
      </div>
   )

   function closeEmailForm() {
      document.getElementById('email-form').style.display = 'none'
   }
}
