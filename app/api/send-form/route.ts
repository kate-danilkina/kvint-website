import { NextRequest, NextResponse } from 'next/server'
import { sendFormNotification } from '@/lib/email'
import { sendTelegramNotification } from '@/lib/telegram'
import { appendToSheet } from '@/lib/sheets'

export async function POST(req: NextRequest) {
  console.log('[send-form] handler fired')
  console.log('[send-form] env check', {
    hasResend: !!process.env.RESEND_API_KEY,
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

    // 1. Email — primary notification channel
    try {
      await sendFormNotification({ name, company, contact, message, niche, budget, formType })
      console.log('[send-form] email sent')
    } catch (emailErr) {
      console.error('[send-form] email error:', emailErr)
    }

    // 2. Telegram — secondary, best-effort
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

    try {
      await sendTelegramNotification(tgText)
      console.log('[send-form] telegram sent')
    } catch (tgErr) {
      console.error('[send-form] Telegram error:', tgErr)
    }

    // 3. Sheets — fire-and-forget
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
