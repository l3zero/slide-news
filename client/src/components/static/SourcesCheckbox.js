import React from 'react'
import Checkbox from 'rc-checkbox'
import {formData} from '../../data/formData.js'
import '../../styles/checkbox.css'

export default function SourcesCheckbox(props) {
   return (
      <div className='checkbox-container' id='sources-container'>
         <div>Choose your news sources</div>
         <form onSubmit={formHandler}>
            {formData.SOURCES.map((item) => (
               <label key={item.url}>
                  {item.name}
                  <Checkbox
                     className='checkbox'
                     id={item.name.trim().toLowerCase()}
                     name={item}
                     value={item.name}
                     key={item}
                     onClick={showSubmit}
                  />
               </label>
            ))}
            <input className='submit' id='sources-submit' type='submit' value='➡️' />
         </form>
      </div>
   )

   function formHandler(e) {
      e.preventDefault()
      const eventArray = [...e.target]
      let checkedArray = []
      eventArray.map((item) => {
         if (item.checked) {
            checkedArray.push(formData.SOURCES.find((source) => source.name === item.value))
         }
      })
      if (checkedArray.length === 0) {
         alert('Please select some news sources!')
      } else {
         const loc = document.location.toString().split('#')[0]
         document.location = loc + '#' + 'interval-container'
         props.handler(checkedArray)
      }
   }

   function showSubmit(e) {
      if (e.target.checked) {
         document.getElementById('sources-submit').style.display = 'initial'
      }
   }
}
