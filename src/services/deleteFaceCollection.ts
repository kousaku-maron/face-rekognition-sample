import { rekognition } from '../repositories'
import { Rekognition, AWSError } from 'aws-sdk'

type Result = {
  success: boolean
  data?: Rekognition.DeleteCollectionResponse
  error?: AWSError
}

export const deleteFaceCollection = (collectionID: string) => {
  const params = { CollectionId: collectionID }
  
  return new Promise<Result>(resolve => {
    rekognition.deleteCollection(params, (err, data) => {
      if (err) {
        resolve({ success: false, error: err })
        return
      }
      resolve({ success: true, data })
    })
  })
}
