import * as dotenv from 'dotenv'
import AWS from 'aws-sdk'

dotenv.config()

const accessKey = process.env.AWS_ACCESS_KEY
const secretKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.REGION

AWS.config.update({
  region,
  credentials: new AWS.Credentials(accessKey!, secretKey!)
})

export const s3 = new AWS.S3()
export const rekognition = new AWS.Rekognition()
