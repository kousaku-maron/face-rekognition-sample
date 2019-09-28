import { rekognition } from './../../repositories'
import { Rekognition, AWSError } from 'aws-sdk'
import { FACE_COLLECTION_ID } from './../../entities'

type Result = {
  success: boolean
  data?: Rekognition.CreateCollectionResponse
  error?: AWSError
}

export const createFaceCollection = (collectionID: string) => {
  const params = { CollectionId: collectionID }
  
  return new Promise<Result>(resolve => {
    rekognition.createCollection(params, (err, data) => {
      if (err) {
        resolve({ success: false, error: err })
        return
      }
      resolve({ success: true, data })
    })
  })
}

export const createDefaultFaceCollection = async () => {
  const result = await createFaceCollection(FACE_COLLECTION_ID)
  return result
}
