import { rekognition } from './../../repositories'
import { setFace, deleteFace } from './../../repositories/registerFace'
import { Rekognition, AWSError } from 'aws-sdk'
import { FACE_COLLECTION_ID } from './../../entities'

type Result = {
  success: boolean
  data?: Rekognition.IndexFacesResponse
  error?: AWSError
}

export const registerFace = (collectionID: string, faceID: string, path: string) => {
  return new Promise<Result>(async resolve => {
    try {
      const { bucket, name } = await setFace(path)
      if(!bucket || !name) throw new Error('写真のアップロードに失敗しました。')

      const params = {
        CollectionId: collectionID,
        DetectionAttributes: [
        ], 
        ExternalImageId: faceID,
        Image: {
         S3Object: {
          Bucket: bucket,
          Name: name
         }
        }
      }
  
      rekognition.indexFaces(params, async (err, data) => {
        if (err) throw err

        const { bucket, name } = await deleteFace()
        if (!bucket || !name) throw new Error('写真の削除に失敗しました。')

        resolve({ success: true, data })
      })
    } catch (e) {
      resolve({ success: false, error: e })
    }
  })
}

export const registerDefaultFace = async (faceID: string, path: string) => {
  const result = await registerFace(FACE_COLLECTION_ID, faceID, path)
  return result
}
