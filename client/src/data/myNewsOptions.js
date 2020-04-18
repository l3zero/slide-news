const hash = require('object-hash')
const moment = require('moment')

export function updateMyNews(options) {
   options.id = hash(combiner(options))
   options.expire = moment(options.created)
      .add(options.myInterval[0].value, 'days')
      .format('l')

   return options
}

export function initMyNews() {
   const myNewsInit = {
      id: null,
      created: moment().format('l'),
      expires: null
   }
   return myNewsInit
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

   let interval = new Array(obj.myInterval)
      .join('')
      .trim()
      .toLowerCase()

   return topics + sources + interval
}
