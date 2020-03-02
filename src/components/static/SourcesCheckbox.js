import React from 'react'
import {formData} from '../../helpers/constData'

export default function SourcesCheckbox(props) {
   return (
      <div className='checkbox'>
         <h1>Choose your news sources</h1>
         <form onSubmit={topicHandler}>
            {formData.SOURCES.map((item) => (
               <label key={item}>
                  {item}
                  <input type='checkbox' id={item.trim().toLowerCase()} name={item} value={item} key={item} />
               </label>
            ))}
            <input id='checkboxSubmit' type='submit' value='Submit' />
         </form>
      </div>
   )

   function topicHandler(e) {
      e.preventDefault()
      const eventArray = [...e.target]
      let checkedArray = []
      eventArray.map((item) => {
         if (item.checked) {
            checkedArray.push(item.value)
         }
      })
      // eslint-disable-next-line react/prop-types
      props.handler(checkedArray)
   }
}
