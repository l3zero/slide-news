const moment = require('moment')

export function expireCheck(expireDate) {
   const now = moment()
   const exp = moment(expireDate)

   if (exp.diff(now, 'days') < 1) {
      return true
   } else {
      return false
   }
}

export function expireUpdate(interval) {
   return moment()
      .add(interval, 'days')
      .format('l')
}
