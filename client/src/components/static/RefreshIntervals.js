import React, {useEffect, useState} from 'react'
import {formData} from '../../data/formData.js'
import {editSubmitArrow, editGoButton} from '../../animation/animationController.js'
import '../../styles/radio.css'

export default function RefreshIntervals(props) {
   const [animCount, setAnimCount] = useState(0)
   const [goCount, setGoCount] = useState(0)

   useEffect(() => {
      if (animCount === 1) {
         editSubmitArrow('#interval-submit')
      }
   }, [animCount])
   useEffect(() => {
      if (goCount === 1) {
         editGoButton('#go')
      }
   }, [goCount])

   return (
      <div className='radio-container' id='interval-container'>
         <div>Pick your interval!</div>
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
      // eslint-disable-next-line array-callback-return
      eventArray.map((item) => {
         if (item.checked) {
            checkedArray.push(formData.INTERVALS.find((interval) => interval.name === item.value))
         }
      })
      if (checkedArray.length === 0) {
         alert('Please select an interval!')
      } else {
         props.handler(checkedArray)
         setGoCount(1)
         document.getElementById('interval-submit').style.display = 'none'
         document.getElementById('news-link').style.display = 'initial'
         document.getElementById('go').style.display = 'initial'
      }
   }

   function showSubmit(e) {
      if (e.target.checked) {
         setAnimCount(animCount + 1)
         document.getElementById('interval-submit').style.display = 'initial'
      }
   }
}
