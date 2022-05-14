import sanitizeHtml from 'sanitize-html'
import { createTemplate } from '../../../clients/ses.js'

export const createTemplateService = async (req, res) => {
  const { content, name, subject } = req.body

  const { $metadata: meta } = await createTemplate({
    html: sanitizeHtml(content),
    name,
    subject,
  })

  return res.json({ message: 'Template created with success!', meta })
}
