import { searchDefaultFace } from '../services/face'
import fs from 'fs'
import path from 'path'

export const search = async () => {
  try {
    const _path = path.resolve(__dirname, `./../../assets/search`)
    const images = fs.readdirSync(_path).map(image => path.resolve(__dirname, `./../../assets/search/${image}`))

    const tasks = images.map(async image => {
      const { success, error, data } = await searchDefaultFace(image)
      if (success && !error) {
        if (!data || !data.FaceMatches || data.FaceMatches.length === 0) {
          console.info('not match faces')
          return
        }

        // confidenceよりこちらの方が性格かも
        // const similarity = data.FaceMatches[0].Similarity 

        const face = data.FaceMatches[0].Face!

        if (!face) console.info(image, data)
        if (face) {
          const name = face.ExternalImageId
          const confidence = face.Confidence
          console.info(image, name, `${confidence}%`)
        }
      }
      if (error) console.warn(error.message)
      return
    })

    await Promise.all(tasks)
  } catch (e) {
    console.error(e)
  }
}

search()
