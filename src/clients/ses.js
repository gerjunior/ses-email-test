import { SESClient, SendEmailCommand, CreateTemplateCommand, GetTemplateCommand } from '@aws-sdk/client-ses'

export const client = new SESClient()

export const sendEmail = async ({
  source = process.env.EMAIL_SOURCE,
  to = [],
  cc = [],
  bcc = [],
  subject = '',
  message = '',
}) => {
  const command = new SendEmailCommand({
    Source: source,
    Destination: {
      ToAddresses: to,
      CcAddresses: cc.length ? cc : undefined,
      BccAddresses: bcc.length ? bcc : undefined,
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Html: {
          Data: message,
        },
      },
    },
    Tags: [{ Name: 'Test', Value: 'Test' }],
  })

  return client.send(command)
}

export const createTemplate = async ({ name, subject, html }) => {
  const command = new CreateTemplateCommand({
    Template: {
      TemplateName: name,
      SubjectPart: subject,
      HtmlPart: html,
      TextPart: html.replace(/<\/?\w+>/g, ''),
    },
  })

  return client.send(command)
}

export const getTemplate = async ({ name }) => {
  const command = new GetTemplateCommand({
    TemplateName: name,
  })

  return client.send(command)
}
