import React from 'react'
import 'rc-checkbox/assets/index.css'
import Checkbox from 'rc-checkbox'
import {formData} from '../../data/formData.js'
import '../../styles/checkbox.css'

export default function TopicsCheckbox(props) {
   return (
      <div className='checkbox-container'>
         <div>Choose your topics</div>
         <form onSubmit={formHandler}>
            {formData.TOPICS.map((item) => (
               <label key={item}>
                  {item}
                  <Checkbox className='checkbox' id={item.trim().toLowerCase()} name={item} value={item} key={item} />
               </label>
            ))}
            <input id='submit' type='submit' value='Submit' />
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
