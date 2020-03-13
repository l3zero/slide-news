export function lsTest() {
   let test = 'test'
   try {
      window.localStorage.setItem(test, test)
      window.localStorage.removeItem(test)
      return true
   } catch (e) {
      return false
   }
}
