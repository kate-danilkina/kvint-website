import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramNotification } from '@/lib/telegram'
import { appendToSheet } from '@/lib/sheets'

export async function POST(req: NextRequest) {
  console.log('[send-presentation] handler fired')
  console.log('[send-presentation] env check', {
    hasTGToken: !!process.env.TELEGRAM_BOT_TOKEN,
    hasChatId: !!process.env.TELEGRAM_CHAT_ID,
  })

  try {
    const { contact, type } = await req.json()
    console.log('[send-presentation] body', { type, hasContact: !!contact })

    if (!contact || !type) {
      return NextResponse.json({ success: false, message: 'Заполните поле' }, { status: 400 })
    }

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(contact)) {
        return NextResponse.json({ success: false, message: 'Некорректный email' }, { status: 400 })
      }
    }

    if (type === 'telegram') {
      const tgRegex = /^@[\w]{3,}$/
      if (!tgRegex.test(contact)) {
        return NextResponse.json({ success: false, message: 'Некорректный Telegram @username' }, { status: 400 })
      }
    }

    const tgText =
      `📎 <b>Запрос презентации</b>\n` +
      `Тип: ${type === 'email' ? '📧 Email' : '💬 Telegram'}\n` +
      `Контакт: <code>${contact}</code>\n` +
      `Дата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`

    // Telegram notification
    try {
      await sendTelegramNotification(tgText)
    } catch (tgErr) {
      console.error('[send-presentation] Telegram error:', tgErr)
    }

    // Sheets (non-critical, fire-and-forget)
    appendToSheet([
      new Date().toISOString(),
      'lead_magnet',
      contact,
      type,
      '',
      '',
    ]).catch((err) => console.error('[send-presentation] sheets error:', err))

    const message =
      type === 'email'
        ? 'Напишите нам @kvint_agency в Telegram — пришлём сразу!'
        : 'Напишите нам @kvint_agency в Telegram — пришлём сразу!'

    return NextResponse.json({ success: true, message })
  } catch (error) {
    const err = error as Error
    console.error('[send-presentation] fatal error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
