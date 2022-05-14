import express from 'express'
import dotenv from 'dotenv'

import { emailsRouter } from './modules/emails/routes/emails.routes.js'

import 'express-async-errors'

dotenv.config({
  path: `.env`,
  override: true,
})

const app = express()

app.use(express.json())

app.use('/emails', emailsRouter)

app.use((error, _req, res, _next) => {
  console.error(error)

  res.status(500).json({
    message: error.message,
  })
})

app.listen(3000, () => console.log('Server running on port 3000'))
