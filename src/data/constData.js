const hash = require('object-hash')

export const formData = {
   TOPICS: ['Javascript', 'Node', 'React'],
   SOURCES: [
      {name: 'Dev.to', url: 'https://dev.to/api/articles', id: hash('https://dev.to/api/articles')},
      {name: 'Hacker News', url: 'https://hacker-news.firebaseio.com', id: hash(' https://hacker-news.firebaseio.com')}
   ],
   INTERVALS: ['Every Day', 'Every 3 Days', 'Once a Week']
}
