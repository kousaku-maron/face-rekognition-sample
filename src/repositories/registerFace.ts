import { s3 } from './aws'
import fs from 'fs'
import path from 'path'
import { REGISTER_FACE_BUCKET } from '../entities'

type Result = {
  bucket?: string
  name?: string
}

export const setFace = (_path: string, key: string) => {
  return new Promise<Result>(resolve => {
    try {
      const imagePath = path.resolve(__dirname, _path)
      // console.info(`read image from ${imagePath}`)
      const image = fs.readFileSync(imagePath)
      const params = {
        Bucket: REGISTER_FACE_BUCKET,
        Key: key,
        Body: image
      }
      s3.putObject(params, (err, data) => {
        if (err) throw new Error(err.message)
        resolve({ bucket: REGISTER_FACE_BUCKET, name: key })
      })
    } catch (e) {
      console.error(e)
      resolve({})
    }
  })
}

// export const getFace = (etag: string) =>
// }

export const deleteFace = (key: string) => {
  return new Promise<Result>(resolve => {
    try {
      const params = {
        Bucket: REGISTER_FACE_BUCKET,
        Key: key
      }
      s3.deleteObject(params, (err, data) => {
        if (err) throw new Error(err.message)
        resolve({ bucket: REGISTER_FACE_BUCKET, name: key })
      })
    } catch (e) {
      console.error(e)
      resolve({})
    }
  })
}
