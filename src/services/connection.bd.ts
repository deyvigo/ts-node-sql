import { createPool } from 'mysql2/promise'

export const connection = createPool({
  host: 'localhost',
  user: process.env.NAME ?? 'root', // Nunca poner user en las variables de entorno
  password: process.env.PASSWORD ?? '12345678',
  database: process.env.DATABASE ?? 'readdb',
  multipleStatements: true
})
