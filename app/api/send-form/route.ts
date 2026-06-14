import { NextRequest, NextResponse } from 'next/server'
import { sendTelegramNotification } from '@/lib/telegram'
import { appendToSheet } from '@/lib/sheets'

export async function POST(req: NextRequest) {
  console.log('[send-form] handler fired')
  console.log('[send-form] env check', {
    hasTGToken: !!process.env.TELEGRAM_BOT_TOKEN,
    hasChatId: !!process.env.TELEGRAM_CHAT_ID,
  })

  try {
    const body = await req.json()
    const { name, company, contact, message, niche, budget, formType } = body
    console.log('[send-form] body', { name, formType, hasContact: !!contact })

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

    // 1. Telegram notification
    try {
      await sendTelegramNotification(tgText)
    } catch (tgErr) {
      console.error('[send-form] Telegram error:', tgErr)
    }

    // 2. Sheets (non-critical, fire-and-forget)
    appendToSheet([
      new Date().toISOString(),
      formType,
      name,
      contact,
      company || '',
      message || niche || '',
    ]).catch((err) => console.error('[send-form] sheets error:', err))

    return NextResponse.json({ success: true, message: 'Заявка отправлена!' })
  } catch (error) {
    const err = error as Error
    console.error('[send-form] fatal error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
