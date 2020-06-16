import React from 'react'
import '../../styles/article.css'

export default function Article(props) {
   return (
      <div className='article-container' id={props.id}>
         <div>{props.title}</div>
         <a href={props.url}>
            <img src={props.image} alt='' />
         </a>
      </div>
   )
}
