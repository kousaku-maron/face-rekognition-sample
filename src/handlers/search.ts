import { searchDefaultFace } from '../services/face'
import { setFace } from '../repositories/searchFace'
import fs from 'fs'
import path from 'path'
import uuid from 'uuid/v1'

const isImageFile = (_path: string) => {
  const acceptMineType = ['jpeg', 'jpg', 'png']

  const reg = /(.*)(?:\.([^.]+$))/
  const ext = _path.match(reg)![2]

  return acceptMineType.includes(ext)
}

const limit = 40 //　スループットエラー回避のため、上限を40枚にしている。

export const search = async () => {
  try {
    const _path = path.resolve(__dirname, `./../../assets/search`)
    const images = fs
      .readdirSync(_path)
      .filter(image => isImageFile(image))
      .map(image => path.resolve(__dirname, `./../../assets/search/${image}`))
      .slice(0, limit)

    const tasks = images.map(async image => {
      const { success, error, data } = await searchDefaultFace(image)
      if (success && !error) {
        if (!data || !data.FaceMatches || data.FaceMatches.length === 0) {
          console.info('not find faces')
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
          const key = `${name}/${uuid()}.png`
          await setFace(image, key)
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
