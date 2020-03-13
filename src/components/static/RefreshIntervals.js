import React from 'react'
import {formData} from '../../data/constData'

export default function RefreshIntervals(props) {
   return (
      <div className='radioForm'>
         <h1>How often would you like new articles?</h1>
         <form onSubmit={formHandler}>
            {formData.INTERVALS.map((item) => (
               <label key={item.name}>
                  {item.name}
                  <input
                     type='radio'
                     id={item.name.trim().toLowerCase()}
                     name='intervals'
                     value={item.name}
                     checked
                     readOnly
                  />
               </label>
            ))}
            <input id='submitButton' type='submit' value='Submit' />
         </form>
      </div>
   )

   function formHandler(e) {
      e.preventDefault()
      const eventArray = [...e.target]
      let checkedArray = []
      eventArray.map((item) => {
         if (item.checked) {
            checkedArray.push(formData.INTERVALS.find((interval) => interval.name === item.value))
         }
      })
      // eslint-disable-next-line react/prop-types
      checkedArray.length === 0 ? alert('Please select some options!') : props.handler(checkedArray)
   }
}
