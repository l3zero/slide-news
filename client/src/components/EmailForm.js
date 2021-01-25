import React from 'react'
import emailjs from 'emailjs-com'
import moment from 'moment'
import {emailVal} from '../helpers/validation.js'
import '../styles/emailForm.css'
import {sortArticles} from '../helpers/sort.js'
import {urlToId} from '../helpers/urlConverter'

export default function EmailForm(props) {
   function handleEmailSubmit(e) {
      e.preventDefault()

      if (emailVal(document.querySelector('#email-input').value)) {
         let counter = 0
         let test = sortArticles(props.articles)
            .map(
               (article) => `${article.title}:
         ${article.url}`
            )
            .join('<br></br>')
         let msg = {
            from_name: 'Slide News',
            to_name: document.querySelector('#email-input').value,
            message_html: test,
            current_date: moment().format('LLLL')
         }

         emailjs
            .send(
               process.env.REACT_APP_SERVICE_ID,
               process.env.REACT_APP_EMAIL_TEMPLATE,
               msg,
               process.env.REACT_APP_EMAIL_ID
            )
            .then(
               (result) => {
                  // console.log(result.text)
               },
               (error) => {
                  // console.error(error.text)
               }
            )
      } else {
         alert('Enter a valid email!')
      }
   }

   return (
      <div id='email-form'>
         <span>Enter your email and receive your current articles directly to your inbox for future reading!</span>
         <form onSubmit={handleEmailSubmit}>
            <input id='email-input' type='text' name='emailAddress' placeholder='Enter your email...' />
            <input id='email-submit' type='submit' value='Send my news!' />
         </form>
      </div>
   )
}