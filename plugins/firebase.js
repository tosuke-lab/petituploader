import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/storage'
import '@firebase/firestore'
import '@firebase/messaging'

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
  })
}

export default firebase