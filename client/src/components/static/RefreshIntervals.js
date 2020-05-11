import React from 'react'
import {formData} from '../../data/formData.js'
import '../../styles/radio.css'

export default function RefreshIntervals(props) {
   return (
      <div className='radio-container' id='interval-container'>
         <div>Choose your update interval</div>
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
                     onClick={showSubmit}
                     readOnly
                  />
               </label>
            ))}
            <input className='submit' id='interval-submit' type='submit' value='➡️' />
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
      if (checkedArray.length === 0) {
         alert('Please select an interval!')
      } else {
         props.handler(checkedArray)
         document.getElementById('go').style.display = 'initial'
      }
   }

   function showSubmit(e) {
      if (e.target.checked) {
         document.getElementById('interval-submit').style.display = 'initial'
      }
   }
}
