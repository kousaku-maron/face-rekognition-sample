import { s3 } from './../../repositories'
import { AWSError } from 'aws-sdk'
import { REGISTER_FACE_BUCKET } from './../../entities'

type Result = {
  success: boolean
  data?: {} // 型がないと思われる。
  error?: AWSError
}

export const deleteRegisterBucket = (bucket: string) => {
  const params = { Bucket: bucket }
  
  return new Promise<Result>(resolve => {
    s3.deleteBucket(params, (err, data) => {
      if (err) {
        resolve({ success: false, error: err })
        return
      }
      resolve({ success: true, data })
    })
  })
}

export const deleteDefaultRegisterBucket = async () => {
  const result = await deleteRegisterBucket(REGISTER_FACE_BUCKET)
  return result
}
