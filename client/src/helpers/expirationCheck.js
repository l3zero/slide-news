const moment = require('moment')

export function expirationCheck(expireDate) {
   const now = moment()
   const exp = moment(expireDate)

   if (exp.diff(now, 'days') < 1) {
      return true
   } else {
      return false
   }
}
