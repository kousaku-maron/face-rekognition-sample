import { deleteDefaultSearchBucket, deleteDefaultRegisterBucket } from '../services/bucket'
import { deleteDefaultFaceCollection } from '../services/collection'

export const clear = async () => {
  try {
    const sb = await deleteDefaultSearchBucket()

    if (sb.success && !sb.error) {
      console.info(sb.data)
      console.info('delete default serach bucket success!')
    }
  
    if (sb.error) console.warn(sb.error.message)

    const rb = await deleteDefaultRegisterBucket()

    if (rb.success && !rb.error) {
      console.info(rb.data)
      console.info('delete default register bucket success!')
    }
  
    if (rb.error) console.warn(rb.error.message)

    const fc = await deleteDefaultFaceCollection()

    if (fc.success && !fc.error) {
      console.info(fc.data)
      console.info('delete default face collection success!')
    }
  
    if (fc.error) console.warn(fc.error.message)

  } catch (e) {
    console.error(e)
  }
}

clear()
