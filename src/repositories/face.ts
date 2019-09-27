import { s3 } from './aws'
import fs from 'fs'
import path from 'path'

const bucket = 'searchfaces'
const name = 'temp.png'

type Result = {
  bucket?: string
  name?: string
}

export const setFace = (_path: string) => {
  return new Promise<Result>(resolve => {
    try {
      const imagePath = path.resolve(__dirname, _path)
      console.info(`read image from ${imagePath}`)
      const image = fs.readFileSync(imagePath)
      const params = {
        Bucket: bucket,
        Key: name,
        Body: image
      }
      s3.putObject(params, (err, data) => {
        if (err) throw new Error(err.message)
        resolve({ bucket, name })
      })
    } catch (e) {
      console.error(e)
      resolve({})
    }
  })
}

// export const getFace = (etag: string) => {
// }

export const deleteFace = () => {
  return new Promise<Result>(resolve => {
    try {
      const params = {
        Bucket: bucket,
        Key: name
      }
      s3.deleteObject(params, (err, data) => {
        if (err) throw new Error(err.message)
        resolve({ bucket, name })
      })
    } catch (e) {
      console.error(e)
      resolve({})
    }
  })
}
