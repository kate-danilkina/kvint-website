import { NextRequest, NextResponse } from 'next/server'
import { sendPresentationEmail } from '@/lib/email'
import { sendTelegramNotification } from '@/lib/telegram'
import { appendToSheet } from '@/lib/sheets'

export async function POST(req: NextRequest) {
  try {
    const { contact, type } = await req.json()

    if (!contact || !type) {
      return NextResponse.json({ success: false, message: 'Заполните поле' }, { status: 400 })
    }

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(contact)) {
        return NextResponse.json({ success: false, message: 'Некорректный email' }, { status: 400 })
      }
      await sendPresentationEmail(contact)
    }

    if (type === 'telegram') {
      const tgRegex = /^@[\w]{3,}$/
      if (!tgRegex.test(contact)) {
        return NextResponse.json({ success: false, message: 'Некорректный Telegram @username' }, { status: 400 })
      }
    }

    // Telegram notification
    const tgText =
      `📎 <b>Запрос презентации</b>\n` +
      `Тип: ${type === 'email' ? '📧 Email' : '💬 Telegram'}\n` +
      `Контакт: <code>${contact}</code>\n` +
      `Дата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`

    await Promise.allSettled([
      sendTelegramNotification(tgText),
      appendToSheet([
        new Date().toISOString(),
        'lead_magnet',
        contact,
        type,
        '',
        '',
      ]),
    ])

    const message =
      type === 'email'
        ? 'Презентация отправлена на ваш email!'
        : 'Напишите нам @kvint_agency в Telegram — пришлём сразу!'

    return NextResponse.json({ success: true, message })
  } catch (error) {
    console.error('send-presentation error:', error)
    return NextResponse.json({ success: false, message: 'Ошибка сервера' }, { status: 500 })
  }
}
