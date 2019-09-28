import { s3 } from './../../repositories'
import { S3, AWSError } from 'aws-sdk'
import { REGISTER_FACE_BUCKET } from './../../entities'

type Result = {
  success: boolean
  data?: S3.CreateBucketOutput
  error?: AWSError
}

export const createRegisterBucket = (bucket: string) => {
  const params = { Bucket: bucket, ACL: 'public-read-write' }
  
  return new Promise<Result>(resolve => {
    s3.createBucket(params, (err, data) => {
      if (err) {
        resolve({ success: false, error: err })
        return
      }
      resolve({ success: true, data })
    })
  })
}

export const createDefaultRegisterBucket = async () => {
  const result = await createRegisterBucket(REGISTER_FACE_BUCKET)
  return result
}
