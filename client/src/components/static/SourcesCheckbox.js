import React from 'react'
import {formData} from '../../data/formData.js'

export default function SourcesCheckbox(props) {
   return (
      <div className='checkbox'>
         <h1>Choose your news sources</h1>
         <form onSubmit={formHandler}>
            {formData.SOURCES.map((item) => (
               <label key={item.url}>
                  {item.name}
                  <input type='checkbox' id={item.name.trim().toLowerCase()} name={item.name} value={item.name} />
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
            checkedArray.push(formData.SOURCES.find((source) => source.name === item.value))
         }
      })
      // eslint-disable-next-line react/prop-types
      checkedArray.length === 0 ? alert('Please select some options!') : props.handler(checkedArray)
   }
}
