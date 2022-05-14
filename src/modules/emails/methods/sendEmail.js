import mustache from 'mustache'
import sanitizeHtml from 'sanitize-html'

import { sendEmail, getTemplate } from '../../../clients/ses.js'

export const sendEmailService = async (req, res) => {
  const { to = [], name, message, template = 'WelcomeTemplate' } = req.body

  if (!to.length || !message) {
    return res.status(400).json({
      message: 'Missing required fields',
    })
  }

  const { Template } = await getTemplate({ name: template })

  if (!Template) {
    return res.status(400).json({
      message: 'Template not found',
    })
  }

  const fullMessage = mustache.render(Template.HtmlPart, { name, content: sanitizeHtml(message) })

  const { $metadata: meta, MessageId: messageId } = await sendEmail({
    to,
    message: fullMessage,
    subject: Template.SubjectPart,
  })

  return res.json({
    message: 'Email sent successfully',
    fullMessage,
    meta,
    messageId,
  })
}
