import firebase from './firebase'
import * as functions from 'firebase-functions'
import express from 'express'
import stream from 'stream'
import multer from 'multer'

const upload = multer({
  storage: multer.memoryStorage()
})

const app = express()
app.set('views', './views')
app.set('view engine', 'ejs')

declare global {
  namespace Express {
    interface Request {
      rawBody?: Buffer
    }
  }
}

app.use((req, res, next) => {
  res.set('Cache-Control', `pulic, max-age=300, s-maxage=600`)
  next()
})

app.get('/u/:uid', (req, res) => {
  const uid: string = req.params.uid
  firebase
    .auth()
    .getUser(uid)
    .catch(err => {
      console.error(err)
      return null
    })
    .then(user => {
      if (user == null) {
        res.render('./404.ejs')
      } else {
        res.render('./uploader.ejs', {
          uid
        })
      }
    })
})

app.post('/u/upload', upload.single('file'), async (req, res) => {
  let user: firebase.auth.UserRecord | null

  if (req.body.uid) {
    const uid = req.body.uid
    user = await firebase
      .auth()
      .getUser(uid)
      .catch(err => {
        console.error(err)
        return null
      })

    if (user == null) {
      res.status(404).render('./404.ejs')
      return
    }
  } else {
    res.status(404).render('./404.ejs')
    return
  }

  if (req.file && req.file.size > 0) {
    const file = req.file

    const imagesRef = firebase.firestore().collection('images')

    const imageDocRef = await imagesRef.add({})

    try {
      const bucket = firebase.storage().bucket(process.env.STORAGE_BUCKET)
      const fileRef = bucket.file(imageDocRef.id)

      fileRef
        .save(file.buffer, {
          metadata: {
            contentType: file.mimetype,
            cacheControl: `public,max-age=${1 * 60 * 60 * 24 * 7}` // 7days
          }
        })
        .then(() =>
          imageDocRef.update({
            id: imageDocRef.id,
            unread: true,
            filename: file.originalname,
            owner: user!.uid
          })
        )
        .catch(err => {
          console.error(err)
        })
    } catch (err) {
      await imageDocRef.delete()
      console.error(err)
    }
  }
  res.redirect(`/u/${user.uid}`)
})

export const uploader = functions.https.onRequest((req, res) => {
  if (req.rawBody) {
    req.pipe = function(writeStream) {
      writeStream.end(req.rawBody!)
      return writeStream
    }
  }
  app(req, res)
})
