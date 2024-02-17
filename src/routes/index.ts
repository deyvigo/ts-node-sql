import { readdirSync } from 'fs'
import { Router } from 'express'

const PATH_DIR = `${__dirname}`
const router = Router()

const cleanFileName = (filename: string) => {
  return filename.split('.').shift()
}

readdirSync(PATH_DIR).forEach((d) => {
  const cleanName = cleanFileName(d)
  if (cleanName !== 'index' && cleanName !== undefined) {
    import(`./${cleanName}`).then((moduleRouter) => {
      console.log(`...... /${cleanName}`)
      router.use(`/${cleanName}`, moduleRouter.router)
    }).catch((error) => console.log(error))
  }
})

export { router }
