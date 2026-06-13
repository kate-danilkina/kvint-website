import { Resend } from 'resend'
import fs from 'fs'
import path from 'path'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.RESEND_FROM_EMAIL || 'noreply@kvint.agency'
const TO = process.env.RESEND_TO_EMAIL || 'hello@kvint.agency'

export async function sendPresentationEmail(email: string) {
  const pdfPath = path.join(process.cwd(), 'public', 'kvint-presentation.pdf')
  let attachments: { filename: string; content: Buffer }[] = []

  if (fs.existsSync(pdfPath)) {
    attachments = [{ filename: 'KVINT-презентация.pdf', content: fs.readFileSync(pdfPath) }]
  }

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Презентация Квинт — маркетинговое агентство',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0F; color: #F0F0F5; padding: 40px; border-radius: 16px;">
        <h1 style="color: #1A6EFF; font-size: 28px; margin-bottom: 16px;">Квинт</h1>
        <p style="font-size: 16px; line-height: 1.6; color: #F0F0F5; margin-bottom: 24px;">
          Спасибо за интерес к нашему агентству!<br/>
          Во вложении — наша полная презентация.
        </p>
        <p style="font-size: 14px; color: #888899;">
          Если возникнут вопросы — напишите нам: <a href="mailto:${TO}" style="color: #1A6EFF;">${TO}</a>
        </p>
      </div>
    `,
    attachments,
  })
}

export async function sendFormNotification(data: {
  name: string
  company?: string
  contact: string
  message?: string
  niche?: string
  budget?: string
  formType: 'project' | 'strategy'
}) {
  const subject =
    data.formType === 'project'
      ? `Новая заявка «Обсудить проект» от ${data.name}`
      : `Новая заявка «Стратсессия» от ${data.name}`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; background: #0A0A0F; color: #F0F0F5; padding: 40px; border-radius: 16px;">
      <h2 style="color: #1A6EFF;">${subject}</h2>
      <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px 0; color: #888899; width: 40%;">Имя</td><td style="padding: 8px 0;">${data.name}</td></tr>
        ${data.company ? `<tr><td style="padding: 8px 0; color: #888899;">Компания</td><td style="padding: 8px 0;">${data.company}</td></tr>` : ''}
        <tr><td style="padding: 8px 0; color: #888899;">Контакт</td><td style="padding: 8px 0;">${data.contact}</td></tr>
        ${data.niche ? `<tr><td style="padding: 8px 0; color: #888899;">Ниша</td><td style="padding: 8px 0;">${data.niche}</td></tr>` : ''}
        ${data.budget ? `<tr><td style="padding: 8px 0; color: #888899;">Бюджет</td><td style="padding: 8px 0;">${data.budget}</td></tr>` : ''}
        ${data.message ? `<tr><td style="padding: 8px 0; color: #888899; vertical-align: top;">Задача</td><td style="padding: 8px 0;">${data.message}</td></tr>` : ''}
      </table>
    </div>
  `

  await resend.emails.send({ from: FROM, to: TO, subject, html })
}
