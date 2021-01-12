import React from 'react'
import '../styles/emailForm.css'

export default function EmailForm() {
   return (
      <div id='email-form'>
         <span>
            Enter your email and receive your current articles directly to your inbox.<br></br>This is an easy way to
            save your articles before they are updated with fresh ones based on your update interval.
         </span>
         <form onSubmit={handleEmailSubmit}>
            <input id='email-input' type='text' name='emailAddress' placeholder='Enter your email...' />
            <input id='email-submit' type='submit' value='Send my news!' />
         </form>
      </div>
   )
}

function handleEmailSubmit(e) {
   e.preventDefault()
}
