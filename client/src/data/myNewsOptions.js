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
   const time = obj.timeCreated
      .trim()
      .toLowerCase()
      .replace(':', '')

   const day = obj.created
      .trim()
      .toLowerCase()
      .replace('/', '')

   return day + time
}
