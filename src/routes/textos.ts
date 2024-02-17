import { Router } from 'express'
import { getAllTexts, getTextById, getTextWithQuestionById } from '../controllers/textos'

const router = Router()

router.get('/', getAllTexts)

router.get('/:id', getTextById)

router.get('/text/:id', getTextWithQuestionById)

router.get('/hola', (_, res) => {
  res.send(JSON.stringify({ saludo: 'Hola Deyvi' }))
})

export { router }
