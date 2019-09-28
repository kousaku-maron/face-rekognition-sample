// import { createFaceCollection, deleteFaceCollection, registerFace, searchFace } from './services'
import { init } from './handlers/init'

init()

// const collectionID = 'kurinoSample'
// const faceID = 'kurino'

// const bucket = 'samplefaces'
// const images = ['kurino/test01.png', 'kurino/test02.png', 'kurino/test03.png', 'kurino/test04.png', 'kurino/test05.png']
// const testImage = '../../sample/test05.png'

// const main = async () => {
//   try {
//     const { success, data, error } = await createFaceCollection(collectionID)
//     if(success && !error) {
//       console.info(data)
//     }
//     if(error) {
//       console.warn(error)
//       throw new Error(error.message)
//     }
//   } catch (e) {
//     console.error(e)
//   }
// }

// const main = async () => {
//   try {
//     const { success, data, error } = await deleteFaceCollection(collectionID)
//     if(success && !error) {
//       console.info(data)
//     }
//     if(error) {
//       console.warn(error)
//       throw new Error(error.message)
//     }
//   } catch (e) {
//     console.error(e)
//   }
// }

// const main = async () => {
//   try{
//     const tasks = images.map(async image => {
//       const { success, data, error } = await registerFace(collectionID, faceID, bucket, image)
//       if(success && !error) {
//         console.info(data)
//       }
//       if(error) {
//         console.warn(error)
//         throw new Error(error.message)
//       }
//       return { success, data, error }
//     })

//     await Promise.all(tasks)
//   }
//   catch(e) {
//     console.error(e)
//   }
// }

// const main = async () => {
//   try {
//     const { success, data, error } = await searchFace(collectionID, testImage)
//     if(success && !error) {
//       console.info(data!.FaceMatches![0].Face)
//     }
//     if(error) throw new Error(error.message)
//   } catch (e) {
//     console.error(e)
//   }
// }

// main()
