import nodemailer from 'nodemailer'

function json(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function isValidEmail(value) {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (trimmed.length < 6 || trimmed.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}

function isSameOrigin(origin, host) {
  if (!origin || !host) return true
  try {
    const url = new URL(origin)
    return url.host === host
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  const origin = req.headers?.origin
  const host = req.headers?.host

  res.setHeader('Vary', 'Origin')
  if (origin && isSameOrigin(origin, host)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS')
    json(res, 405, { ok: false, error: 'Method not allowed' })
    return
  }

  if (origin && !isSameOrigin(origin, host)) {
    json(res, 403, { ok: false, error: 'Forbidden' })
    return
  }

  let payload = req.body
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload)
    } catch {
      json(res, 400, { ok: false, error: 'Invalid JSON' })
      return
    }
  }

  const name = typeof payload?.name === 'string' ? payload.name.trim() : ''
  const email = typeof payload?.email === 'string' ? payload.email.trim() : ''
  const company = typeof payload?.company === 'string' ? payload.company.trim() : ''
  const message = typeof payload?.message === 'string' ? payload.message.trim() : ''
  const page = typeof payload?.page === 'string' ? payload.page.trim() : ''
  const website = typeof payload?.website === 'string' ? payload.website.trim() : ''

  if (website) {
    json(res, 200, { ok: true })
    return
  }

  if (!name || !message || !isValidEmail(email)) {
    json(res, 400, { ok: false, error: 'Missing or invalid fields' })
    return
  }

  const smtpHost = process.env.SMTP_HOST || process.env.MAIL_HOST || ''
  const smtpPort = Number(process.env.SMTP_PORT || process.env.MAIL_PORT || 465)
  const smtpUser = process.env.SMTP_USER || process.env.MAIL_USER || ''
  const smtpPass = process.env.SMTP_PASS || process.env.MAIL_PASS || ''

  const toEmail = process.env.CONTACT_TO_EMAIL || smtpUser
  const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser
  const fromName = process.env.CONTACT_FROM_NAME || 'HKFT Services'

  if (!smtpHost || !smtpUser || !smtpPass || !toEmail || !fromEmail) {
    json(res, 500, { ok: false, error: 'Email is not configured' })
    return
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number.isFinite(smtpPort) ? smtpPort : 465,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  })

  const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX || 'HKFT Services — Contact'
  const safeCompany = company ? ` (${company})` : ''
  const subject = `${subjectPrefix}: ${name}${safeCompany}`

  const text = [
    'New website enquiry',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    page ? `Page: ${page}` : null,
    '',
    'Message:',
    message,
    '',
    '---',
    'Sent via hkftservices.co.za contact form',
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'; line-height:1.45; color:#111827;">
      <h2 style="margin:0 0 12px;">New website enquiry</h2>
      <p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${company ? `<p style="margin:0 0 8px;"><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
      ${page ? `<p style="margin:0 0 12px;"><strong>Page:</strong> ${escapeHtml(page)}</p>` : ''}
      <div style="margin-top:12px; padding:12px; border:1px solid #E5E7EB; border-radius:10px; background:#F9FAFB;">
        <div style="font-weight:600; margin-bottom:8px;">Message</div>
        <div style="white-space:pre-wrap;">${escapeHtml(message)}</div>
      </div>
      <p style="margin:14px 0 0; font-size:12px; color:#6B7280;">Sent via hkftservices.co.za contact form</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject,
      text,
      html,
    })
    json(res, 200, { ok: true })
  } catch (err) {
    console.error('[contact] sendMail failed', err)
    json(res, 500, { ok: false, error: 'Failed to send email' })
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
