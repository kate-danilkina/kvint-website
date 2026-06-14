const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function sendTelegramNotification(text: string) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('[telegram] Missing BOT_TOKEN or CHAT_ID — notification skipped')
    return
  }

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Telegram API ${res.status}: ${body}`)
  }

  console.log('[telegram] message sent OK')
}
