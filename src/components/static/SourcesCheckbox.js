import React from 'react'
import {formData} from '../../data/constData'

export default function SourcesCheckbox(props) {
   return (
      <div className='checkbox'>
         <h1>Choose your news sources</h1>
         <form onSubmit={formHandler}>
            {formData.SOURCES.map((item) => (
               <label key={item.id}>
                  {item.name}
                  <input
                     type='checkbox'
                     id={item.name.trim().toLowerCase()}
                     name={item.name}
                     value={item.name}
                     key={item.id}
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
            checkedArray.push(item.value)
         }
      })
      // eslint-disable-next-line react/prop-types
      checkedArray.length === 0 ? alert('Please select some options!') : props.handler(checkedArray)
   }
}
