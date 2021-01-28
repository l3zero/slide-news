import React from 'react'
import {urlToId} from '../helpers/urlConverter'
import '../styles/articleList.css'
import {sortArticles} from '../helpers/sort.js'

export default function ArticleList(props) {
   let count = 1
   return (
      <div className='mini-article-list' id='my-articles'>
         <span className='close' onClick={closeArticleList}>
            &times;
         </span>
         {sortArticles(props.articles).map((article) => (
            <div key={urlToId(article.url)}>
               {count++}){' '}
               <a href={article.url} key={urlToId(article.url)}>
                  {article.title}
               </a>
               {'\n'}
            </div>
         ))}
      </div>
   )

   function closeArticleList() {
      document.getElementById('my-articles').style.display = 'none'
   }
}
