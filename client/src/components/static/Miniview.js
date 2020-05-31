import React from 'react'
import '../../styles/miniview.css'
import {urlToId} from '../../helpers/urlConverter'

export default function Miniview(props) {
   return (
      <React.Fragment>
         <div className='menu-container'>
            <img id='menu-slide' src={require('../../img/slide.svg')} alt='' />
            <div className='menu-content'>
               <div id='menu-articles' onClick={viewArticleList}>
                  My Articles
               </div>
               <div id='menu-clear'>Clear Options</div>
            </div>
         </div>
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
      </React.Fragment>
   )

   function viewArticleList(e) {
      document.getElementById('my-articles').style.display = 'flex'
   }
   function closeArticleList() {
      document.getElementById('my-articles').style.display = 'none'
   }
}
