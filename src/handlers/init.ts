import { createDefaultSearchBucket, createDefaultRegisterBucket } from '../services/bucket'
import { createDefaultFaceCollection } from '../services/collection'

export const init = async () => {
  try {
    const sb = await createDefaultSearchBucket()

    if (sb.success && !sb.error) {
      console.info(sb.data)
      console.info('create default serach bucket success!')
    }
  
    if (sb.error) console.warn(sb.error.message)

    const rb = await createDefaultRegisterBucket()

    if (rb.success && !rb.error) {
      console.info(rb.data)
      console.info('create default register bucket success!')
    }
  
    if (rb.error) console.warn(rb.error.message)

    const fc = await createDefaultFaceCollection()

    if (fc.success && !fc.error) {
      console.info(fc.data)
      console.info('create default face collection success!')
    }
  
    if (fc.error) console.warn(fc.error.message)

  } catch (e) {
    console.error(e)
  }
}

init()
