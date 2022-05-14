import express from 'express'
import { sendEmailService } from '../methods/sendEmail.js'
import { createTemplateService } from '../methods/createTemplate.js'

const emailsRouter = express.Router()

emailsRouter.post('/send', sendEmailService)
emailsRouter.post('/template', createTemplateService)

export { emailsRouter }
