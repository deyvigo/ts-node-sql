import express from 'express'
import 'dotenv/config'
import { router } from './routes'
import cors from 'cors'

const PORT = process.env.PORT ?? 4000

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

app.listen(PORT, () => {
  console.log(`Server ready on: http://localhost:${PORT}`)
})
