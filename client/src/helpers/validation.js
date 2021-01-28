import isEmail from 'validator/es/lib/isEmail'

export function emailVal(email) {
   return isEmail(email)
}
