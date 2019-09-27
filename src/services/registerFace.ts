import { rekognition } from '../repositories'
import { Rekognition, AWSError } from 'aws-sdk'

type Result = {
  success: boolean
  data?: Rekognition.IndexFacesResponse
  error?: AWSError
}

export const registerFace = (collectionID: string, faceID: string, bucket: string, name: string) => {
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
  
  return new Promise<Result>(resolve => {
    rekognition.indexFaces(params, (err, data) => {
      if (err) {
        resolve({ success: false, error: err })
        return
      }
      resolve({ success: true, data })
    })
  })
}
