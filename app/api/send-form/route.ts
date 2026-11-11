import { NextRequest, NextResponse } from 'next/server'
import { sendFormNotification } from '@/lib/email'
import { sendTelegramNotification } from '@/lib/telegram'
import { appendToSheet } from '@/lib/sheets'
import { LEAD_SOURCES } from '@/lib/utils'
import { escapeHtml } from '@/lib/escape'

export async function POST(req: NextRequest) {
  console.log('[send-form] handler fired')
  console.log('[send-form] env check', {
    hasResend: !!process.env.RESEND_API_KEY,
    hasTGToken: !!process.env.TELEGRAM_BOT_TOKEN,
    hasChatId: !!process.env.TELEGRAM_CHAT_ID,
  })

  try {
    const body = await req.json()
    // Honeypot: the hidden `website` field is empty for people. A bot that fills it gets a fake success and nothing is sent
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      console.log('[send-form] honeypot filled, dropped')
      return NextResponse.json({ success: true })
    }

    const { name, company, contact, message, niche, budget, formType } = body
    // Optional «Откуда узнали о нас»: only accept known options (value is inserted into HTML/Telegram markup)
    const source: string | undefined = (LEAD_SOURCES as readonly string[]).includes(body.source) ? body.source : undefined
    const sourceLine = source ? `Откуда узнали: ${source}` : ''
    // Email and Sheets have no dedicated column, so the answer travels inside the free-text field
    const messageWithSource = [message, sourceLine].filter(Boolean).join(' · ') || undefined
    console.log('[send-form] body', { name, formType, hasContact: !!contact })

    if (!name || !contact) {
      return NextResponse.json({ success: false, message: 'Заполните обязательные поля' }, { status: 400 })
    }

    // 1. Email — primary notification channel
    let emailOk = false
    try {
      await sendFormNotification({ name, company, contact, message: messageWithSource, niche, budget, formType })
      emailOk = true
      console.log('[send-form] email sent')
    } catch (emailErr) {
      console.error('[send-form] email error:', emailErr)
    }

    // 2. Telegram — the library skips silently without env vars, so check them here to not count a skip as delivered
    const isStrategy = formType === 'strategy'
    const emoji = isStrategy ? '📅' : '📩'
    const tgText =
      `${emoji} <b>${isStrategy ? 'Заявка: Разбор (10 000 ₽)' : 'Заявка: Видеоразбор (бесплатно)'}</b>\n\n` +
      `👤 Имя: ${escapeHtml(name)}\n` +
      (company ? `🏢 Компания: ${escapeHtml(company)}\n` : '') +
      `📱 Контакт: ${escapeHtml(contact)}\n` +
      (niche ? `🎯 Ниша: ${escapeHtml(niche)}\n` : '') +
      (budget ? `💰 Бюджет: ${escapeHtml(budget)}\n` : '') +
      (source ? `🧭 Откуда узнали: ${source}\n` : '') +
      (message ? `\n💬 Задача:\n${escapeHtml(message)}\n` : '') +
      `\n🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`

    let telegramOk = false
    const tgConfigured = !!process.env.TELEGRAM_BOT_TOKEN && !!process.env.TELEGRAM_CHAT_ID
    try {
      await sendTelegramNotification(tgText)
      telegramOk = tgConfigured
      console.log('[send-form] telegram sent')
    } catch (tgErr) {
      console.error('[send-form] Telegram error:', tgErr)
    }

    // 3. Sheets — fire-and-forget, keeps a copy of every lead that reached the server
    appendToSheet([
      new Date().toISOString(),
      formType,
      name,
      contact,
      company || '',
      [message || niche, sourceLine].filter(Boolean).join(' · '),
    ]).catch((err) => console.error('[send-form] sheets error:', err))

    // Sheets swallows its own errors, so a configured sheet is the best signal that the lead is stored
    const sheetsConfigured = !!process.env.GOOGLE_SHEET_ID && !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    if (!emailOk && !telegramOk && !sheetsConfigured) {
      console.error('[send-form] all channels failed', { name, formType })
      return NextResponse.json(
        { success: false, message: 'Не получилось отправить заявку. Напишите нам в Telegram или позвоните' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, message: 'Заявка отправлена!' })
  } catch (error) {
    const err = error as Error
    console.error('[send-form] fatal error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
