import { RowDataPacket } from 'mysql2'

export interface TextModel extends RowDataPacket {
  id: number
  content: string
  preguntas?: QuestionModel[]
}

export interface QuestionModel extends RowDataPacket {
  id: number
  pregunta: string
  razonamiento: string
  respuesta: string
  text: number
  alternativas?: AlternativeModel[]
}

export interface AlternativeModel extends RowDataPacket {
  id: number
  alternativa: string
  preg: number
}

export type TextQuestionArray = [TextModel[], QuestionModel[], AlternativeModel[]]
