import { AlternativeModel, QuestionModel, TextModel, TextQuestionArray } from '../interfaces/texto.interface'
import { connection } from '../services/connection.bd'

export const getAll = async () => {
  const [textos] = await connection.query<TextModel[]>(
    'SELECT id, content FROM texto LIMIT 2;'
  )
  return textos
}

export const getById = async (id: number) => {
  const [text] = await connection.query<TextModel[]>(
    'SELECT id, content FROM texto WHERE id = ?;',
    [id]
  )
  return text
}

export const getWithQuestionsById = async (id: number) => {
  // 'SELECT t.content, q.pregunta, q.razonamiento, q.respuesta, a.alternativa FROM texto t JOIN question q ON t.id = q.text JOIN alternative a ON a.preg = q.id WHERE t.id = ?;',
  // const [text] = await connection.query<TextQuestionArray>(`
  //   SELECT id, content FROM texto WHERE id = ?;
  //   SELECT id, pregunta, razonamiento, respuesta FROM question WHERE text = ?;
  //   SELECT a.id, a.alternativa, a.preg FROM texto t JOIN question q ON t.id = q.text JOIN alternative a ON a.preg = q.id WHERE t.id = ?;
  //   `, [id, id, id]
  // )

  const [texto] = await connection.query<TextModel[]>(
    'SELECT id, content FROM texto WHERE id = ?;',
    [id]
  )
  const [preguntas] = await connection.query<QuestionModel[]>(
    'SELECT id, pregunta, razonamiento, respuesta, text FROM question WHERE text = ?;',
    [id]
  )
  const [alternativas] = await connection.query<AlternativeModel[]>(
    'SELECT a.id, a.alternativa, a.preg FROM texto t JOIN question q ON t.id = q.text JOIN alternative a ON a.preg = q.id WHERE t.id = ?;',
    [id]
  )

  const text: TextQuestionArray = [texto, preguntas, alternativas]

  return text
}
