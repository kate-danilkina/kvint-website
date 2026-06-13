import { NextRequest, NextResponse } from 'next/server'
import { sendFormNotification } from '@/lib/email'
import { sendTelegramNotification } from '@/lib/telegram'
import { appendToSheet } from '@/lib/sheets'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, company, contact, message, niche, budget, formType } = body

    if (!name || !contact) {
      return NextResponse.json({ success: false, message: 'Заполните обязательные поля' }, { status: 400 })
    }

    const isStrategy = formType === 'strategy'

    const emoji = isStrategy ? '📅' : '📩'
    const tgText =
      `${emoji} <b>${isStrategy ? 'Заявка: Диагностика (10 000 ₽)' : 'Заявка: Обсудить проект'}</b>\n\n` +
      `👤 Имя: ${name}\n` +
      (company ? `🏢 Компания: ${company}\n` : '') +
      `📱 Контакт: ${contact}\n` +
      (niche ? `🎯 Ниша: ${niche}\n` : '') +
      (budget ? `💰 Бюджет: ${budget}\n` : '') +
      (message ? `\n💬 Задача:\n${message}\n` : '') +
      `\n🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`

    await Promise.allSettled([
      sendFormNotification({ name, company, contact, message, niche, budget, formType }),
      sendTelegramNotification(tgText),
      appendToSheet([
        new Date().toISOString(),
        formType,
        name,
        contact,
        company || '',
        message || niche || '',
      ]),
    ])

    return NextResponse.json({ success: true, message: 'Заявка отправлена!' })
  } catch (error) {
    console.error('send-form error:', error)
    return NextResponse.json({ success: false, message: 'Ошибка сервера' }, { status: 500 })
  }
}
