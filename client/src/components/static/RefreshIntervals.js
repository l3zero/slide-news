import React from 'react'
import {formData} from '../../data/formData.js'
import '../../styles/radio.css'

export default function RefreshIntervals(props) {
   return (
      <div className='radio-container' id='interval-container'>
         <div>How often would you like new articles?</div>
         <form onSubmit={formHandler}>
            {formData.INTERVALS.map((item) => (
               <label key={item.name}>
                  {item.name}
                  <input
                     type='radio'
                     className='radio-button'
                     id={item.name.trim().toLowerCase()}
                     key={item.name.trim().toLowerCase()}
                     name='intervals'
                     value={item.name}
                     checked
                     readOnly
                  />
               </label>
            ))}
            <input className='submit' type='submit' value='Submit' />
         </form>
      </div>
   )
   function clicker(e) {
      e.preventDefault()
      console.log('clicker')
   }
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
      checkedArray.length === 0 ? alert('Please select an interval!') : props.handler(checkedArray)
   }
}
