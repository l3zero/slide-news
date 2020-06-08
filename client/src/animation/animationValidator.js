import {lsTest} from '../helpers/storageCheck.js'

export function checkIntro() {
   if (
      lsTest() &&
      JSON.parse(window.localStorage.getItem('animateIntro')) === true &&
      window.location.pathname === '/'
   ) {
      return true
   }
   return false
}
