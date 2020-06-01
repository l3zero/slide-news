import React from 'react'
import {urlToId} from '../helpers/urlConverter'
import '../styles/articleList.css'

export default function ArticleList(props) {
   return (
      <div className='mini-article-list' id='my-articles'>
         <span className='close' onClick={closeArticleList}>
            &times;
         </span>
         {props.articles
            .sort((a, b) => {
               let titleA = a.title.toUpperCase()
               let titleB = b.title.toUpperCase()
               if (titleA < titleB) {
                  return -1
               }
               if (titleA > titleB) {
                  return 1
               }
            })
            .map((article) => (
               <a href={article.url} key={urlToId(article.url)}>
                  {article.title}
               </a>
            ))}
      </div>
   )

   function closeArticleList() {
      document.getElementById('my-articles').style.display = 'none'
   }
}
