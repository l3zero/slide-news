import React from 'react'
import {formData} from '../../helpers/constData'

export default function RefreshIntervals(props) {
   return (
      <div className='radioForm'>
         <h1>How often would you like new articles?</h1>
         <form onSubmit={formHandler}>
            {formData.INTERVALS.map((item) => (
               <label key={item}>
                  {item}
                  <input type='radio' id={item.trim().toLowerCase()} name='intervals' value={item} />
               </label>
            ))}
            <input id='submitButton' type='submit' value='Submit' />
         </form>
      </div>
   )

   function formHandler(e) {
      e.preventDefault()
      const eventArray = [...e.target]
      eventArray.map((item) => {
         if (item.checked) {
            // eslint-disable-next-line react/prop-types
            props.handler(item.value)
         }
      })
   }
}
