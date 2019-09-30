import uuid from 'uuid/v1'
import { rekognition } from './../../repositories'
import { setFace, deleteFace } from './../../repositories/searchFace'
import { Rekognition, AWSError } from 'aws-sdk'
import { FACE_COLLECTION_ID } from './../../entities'

type Result = {
  success: boolean
  data?: Rekognition.SearchFacesByImageResponse
  error?: AWSError
}

export const searchFace = (collectionID: string, path: string) => {
  return new Promise<Result>(async resolve => {
    try {
      const key = `${uuid()}.png`
      const { bucket, name } = await setFace(path, key)
      if(!bucket || !name) throw new Error('写真のアップロードに失敗しました。')

      const params = {
        CollectionId: collectionID,
        FaceMatchThreshold: 80, // 80%の精度の物を返す。
        Image: { 
          S3Object: { 
            Bucket: bucket,
            Name: name
          }
        },
        MaxFaces: 1
      }

      rekognition.searchFacesByImage(params, async (err, data) => {
        if (err) {
          resolve({ success: false, error: err })
        }

        const { bucket, name } = await deleteFace(key)
        if (!bucket || !name) throw new Error('写真の削除に失敗しました。')

        resolve({ success: true, data })
      })
    } catch (e) {
      resolve({ success: false, error: e })
    }
  })
}

export const searchDefaultFace = async (path: string) => {
  const result = await searchFace(FACE_COLLECTION_ID, path)
  return result
}
