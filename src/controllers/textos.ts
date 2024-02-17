import { Request, Response } from 'express'
import { getById, getAll, getWithQuestionsById } from '../models/textos'
import { AlternativeModel, QuestionModel, TextModel } from '../interfaces/texto.interface'

export const getAllTexts = async (req: Request, res: Response) => {
  const response = await getAll()
  res.send(response)
}

export const getTextById = async (req: Request, res: Response) => {
  const { id } = req.params
  const response = await getById(parseInt(id))
  if (response.length > 0) {
    res.send(response)
  } else {
    res.status(404).json({ message: 'Texto no encontrado' })
  }
}

export const getTextWithQuestionById = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = await getWithQuestionsById(parseInt(id))
  if (data[0].length > 0) {
    const response = {
      id: data[0][0].id,
      content: data[0][0].content,
      preguntas: data[1].map((q) => ({
        id: q.id,
        pregunta: q.pregunta,
        razonamiento: q.razonamiento,
        respuesta: q.respuesta,
        text: q.text,
        alternativas: data[2].filter((a) => {
          return a.preg === q.id
        }).map((a) => ({
          id: a.id,
          alternativa: a.alternativa,
          preg: a.preg
        } as AlternativeModel))
      } as QuestionModel))
    } as TextModel
    res.json([response])
  } else {
    res.status(404).json({ message: 'Texto no encontrado' })
  }
}
