export const httpInits = (data) => {
   return {
      UPDATE: {
         method: 'PATCH',
         headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json'
         }),
         body: JSON.stringify({
            articles: data
         })
      },
      CREATE: {
         method: 'POST',
         headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json'
         }),
         body: JSON.stringify({
            articles: data
         })
      },
      READ: {
         method: 'GET',
         headers: new Headers({
            Accept: 'application/json'
         })
      },
      DELETE: {
         method: 'DELETE',
         headers: new Headers({
            Accept: 'application/json'
         })
      }
   }
}
