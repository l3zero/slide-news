import React from 'react'
import {formData} from '../../data/formData.js'

export default function TopicsCheckbox(props) {
   return (
      <div className='checkbox'>
         <h1>Choose your topics</h1>
         <form onSubmit={formHandler}>
            {formData.TOPICS.map((item) => (
               <label key={item}>
                  {item}
                  <input type='checkbox' id={item.trim().toLowerCase()} name={item} value={item} key={item} />
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
            checkedArray.push(item.value)
         }
      })
      // eslint-disable-next-line react/prop-types
      checkedArray.length === 0 ? alert('Please select some options!') : props.handler(checkedArray)
   }
}
