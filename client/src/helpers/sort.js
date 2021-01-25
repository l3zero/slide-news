export function sortArticles(articles) {
   // eslint-disable-next-line array-callback-return
   return articles.sort((a, b) => {
      let titleA = a.title.toUpperCase()
      let titleB = b.title.toUpperCase()
      if (titleA < titleB) {
         return -1
      }
      if (titleA > titleB) {
         return 1
      }
   })
}
