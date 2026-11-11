import { Resend } from 'resend'
import { escapeHtml } from '@/lib/escape'

export async function sendFormNotification(data: {
  name: string
  company?: string
  contact: string
  message?: string
  niche?: string
  budget?: string
  formType: 'project' | 'strategy'
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const FROM = process.env.RESEND_FROM_EMAIL || 'noreply@kvint.agency'
  const TO = process.env.RESEND_TO_EMAIL || 'hello@kvint.agency'

  const subject =
    data.formType === 'project'
      ? `Новая заявка «Видеоразбор (бесплатно)» от ${data.name}`
      : `Новая заявка «Разбор» от ${data.name}`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; background: #0A0A0F; color: #F0F0F5; padding: 40px; border-radius: 16px;">
      <h2 style="color: #1561E0;">${escapeHtml(subject)}</h2>
      <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px 0; color: #888899; width: 40%;">Имя</td><td style="padding: 8px 0;">${escapeHtml(data.name)}</td></tr>
        ${data.company ? `<tr><td style="padding: 8px 0; color: #888899;">Компания</td><td style="padding: 8px 0;">${escapeHtml(data.company)}</td></tr>` : ''}
        <tr><td style="padding: 8px 0; color: #888899;">Контакт</td><td style="padding: 8px 0;">${escapeHtml(data.contact)}</td></tr>
        ${data.niche ? `<tr><td style="padding: 8px 0; color: #888899;">Ниша</td><td style="padding: 8px 0;">${escapeHtml(data.niche)}</td></tr>` : ''}
        ${data.budget ? `<tr><td style="padding: 8px 0; color: #888899;">Бюджет</td><td style="padding: 8px 0;">${escapeHtml(data.budget)}</td></tr>` : ''}
        ${data.message ? `<tr><td style="padding: 8px 0; color: #888899; vertical-align: top;">Задача</td><td style="padding: 8px 0;">${escapeHtml(data.message)}</td></tr>` : ''}
      </table>
    </div>
  `

  // Resend reports failures in the result instead of throwing, so turn them into an error here
  const { error } = await resend.emails.send({ from: FROM, to: TO, subject, html })
  if (error) throw new Error(`Resend: ${error.message}`)
}
