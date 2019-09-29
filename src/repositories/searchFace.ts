import { s3 } from './aws'
import fs from 'fs'
import path from 'path'
import uuid from 'uuid/v1'
import { SEARCH_FACE_BUCKET } from '../entities'

type Result = {
  bucket?: string
  name?: string
}

export const setFace = (_path: string) => {
  return new Promise<Result>(resolve => {
    try {
      const key = `${uuid()}.png`
      const imagePath = path.resolve(__dirname, _path)
      console.info(`read image from ${imagePath}`)
      const image = fs.readFileSync(imagePath)
      const params = {
        Bucket: SEARCH_FACE_BUCKET,
        Key: key,
        Body: image
      }
      s3.putObject(params, (err, data) => {
        if (err) throw new Error(err.message)
        resolve({ bucket: SEARCH_FACE_BUCKET, name: key })
      })
    } catch (e) {
      console.error(e)
      resolve({})
    }
  })
}

// export const getFace = (etag: string) => {
// }

// export const deleteFace = () => {
//   return new Promise<Result>(resolve => {
//     try {
//       const params = {
//         Bucket: SEARCH_FACE_BUCKET,
//         Key: SEARCH_FACE_NAME
//       }
//       s3.deleteObject(params, (err, data) => {
//         if (err) throw new Error(err.message)
//         resolve({ bucket: SEARCH_FACE_BUCKET, name: SEARCH_FACE_NAME })
//       })
//     } catch (e) {
//       console.error(e)
//       resolve({})
//     }
//   })
// }
