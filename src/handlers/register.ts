import { registerDefaultFace } from '../services/face'
import fs from 'fs'
import path from 'path'

const isImageFile = (_path: string) => {
  const acceptMineType = ['jpeg', 'jpg', 'png']

  const reg = /(.*)(?:\.([^.]+$))/
  const ext = _path.match(reg)![2]

  return acceptMineType.includes(ext)
}

export const register = async (faceID: string) => {
  try {
    const _path = path.resolve(__dirname, `./../../assets/register/${faceID}`)
    const images = fs
      .readdirSync(_path)
      .filter(image =>　isImageFile(image))
      .map(image => path.resolve(__dirname, `./../../assets/register/${faceID}/${image}`))

    const tasks = images.map(async image => {
      const { success, error, data } = await registerDefaultFace(faceID, image)
      if (success && !error) {
        console.info(data)
        console.info('register default face index!')
      }
      if (error) console.warn(error.message)
      return
    })

    await Promise.all(tasks)
  } catch (e) {
    console.error(e)
  }
}

if (process.argv.length < 3) {
  console.error('add faceID arg')
  process.exit()
}

const faceID = process.argv[2]
register(faceID)
