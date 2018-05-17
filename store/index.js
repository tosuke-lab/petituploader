import Vue from 'vue'
import Vuex from 'vuex'
import user from '~/plugins/user'
import firebase from '~/plugins/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'

const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const imagesRef = db.collection('images')

const createStore = () => new Vuex.Store({
  state: {
    images: [],
    imageURLs: {}
  },
  getters: {
    unreadImages(state) {
      state.images.filter(image => image.unread)
    }
  },
  mutations: {
    setURL(state, { id, url }) {
      state.imageURLs[id] = url
    },
    ...firebaseMutations
  },
  actions: {
    initImages: firebaseAction(async ({ bindFirebaseRef }) => {
      const uid = await user().then(u => u.uid)
      await bindFirebaseRef('images', imagesRef.where('owner', '==', uid))
    }),
    readImage: firebaseAction(async (ctx, { id }) => {
      await imagesRef.doc(id).update({
        unread: false
      })
    })
  }
})

export default createStore