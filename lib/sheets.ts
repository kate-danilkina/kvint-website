export async function appendToSheet(row: string[]) {
  const sheetId = process.env.GOOGLE_SHEET_ID
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY

  if (!sheetId || !serviceAccountKey) return

  try {
    const { google } = await import('googleapis')
    const credentials = JSON.parse(Buffer.from(serviceAccountKey, 'base64').toString('utf-8'))

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    })
  } catch {
    // Non-critical: log silently
    console.error('Sheets append failed')
  }
}
