import * as firebase from 'firebase-admin'
import * as functions from 'firebase-functions'

if (firebase.apps.length === 0) {
  firebase.initializeApp()
}

export default firebase
