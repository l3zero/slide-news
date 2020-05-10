import React from 'react'
import 'rc-checkbox/assets/index.css'
import Checkbox from 'rc-checkbox'
import {formData} from '../../data/formData.js'
import '../../styles/checkbox.css'

export default function TopicsCheckbox(props) {
   return (
      <div className='checkbox-container' id='topics-container'>
         <div>Choose your topics</div>
         <form onSubmit={formHandler}>
            {formData.TOPICS.map((item) => (
               <label key={item}>
                  {item}
                  <Checkbox
                     className='checkbox'
                     id={item.trim().toLowerCase()}
                     name={item}
                     value={item}
                     key={item}
                     onClick={showSubmit}
                  />
               </label>
            ))}
            <input className='submit' id='topics-submit' type='submit' value='➡️' />
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
      if (checkedArray.length === 0) {
         alert('Please select some topics!')
      } else {
         const loc = document.location.toString().split('#')[0]
         document.location = loc + '#' + 'sources-container'
         props.handler(checkedArray)
      }
   }

   function showSubmit(e) {
      if (e.target.checked) {
         document.getElementById('topics-submit').style.display = 'initial'
      }
   }
}
