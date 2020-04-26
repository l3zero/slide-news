const hash = require('object-hash')
const moment = require('moment')

export function updateMyNews(options) {
   options.id = hash(combiner(options))
   options.expires = moment(options.created)
      .add(options.myInterval[0].value, 'days')
      .format('l')

   return options
}

export function initMyNews() {
   const myNewsInit = {
      id: null,
      created: moment().format('l'),
      timeCreated: moment().format('LTS'),
      expires: null
   }
   return myNewsInit
}

function combiner(obj) {
   const topics = new Array(obj.myTopics)
      .join('')
      .trim()
      .toLowerCase()
      .replace(',', '')

   const sources = new Array(obj.mySources)
      .join('')
      .trim()
      .toLowerCase()
      .replace(',', '')

   const interval = new Array(obj.myInterval)
      .join('')
      .trim()
      .toLowerCase()

   const time = obj.timeCreated
      .trim()
      .toLowerCase()
      .replace(':', '')

   return topics + sources + interval + time
}
