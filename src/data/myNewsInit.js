const hash = require('object-hash')
const moment = require('moment')

export function updateMyNews(options) {
   const myNewsInit = {
      ...options,
      id: createHash(options),
      dateCreated: moment().format('l'),
      timeCreated: moment().format('LTS')
   }
   return myNewsInit
}

function createHash(options) {
   return hash(combiner(options))
}

function combiner(obj) {
   let topics = new Array(obj.myTopics)
      .join('')
      .trim()
      .toLowerCase()
      .replace(',', '')

   let sources = new Array(obj.mySources)
      .join('')
      .trim()
      .toLowerCase()
      .replace(',', '')

   let interval = obj.myInterval

   return topics + sources + interval
}
