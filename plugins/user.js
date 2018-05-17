import firebase from '~/plugins/firebase'

export default function user() {
  const user = firebase.auth().currentUser
  if (user) {
    return Promise.resolve(user)
  } else {
    return new Promise((res, rej) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(
        user => { 
          res(user)
          unsubscribe()
        },
        err => {
          rej(err)
          unsubscribe()
        }
      )
    })
  }
}