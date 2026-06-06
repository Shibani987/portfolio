const nodemailer = require('nodemailer');

function sendJson(response, statusCode, data) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(data));
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = async function handler(request, response) {
  try {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      return sendJson(response, 405, { message: 'Only POST requests are allowed.' });
    }

    const { name, email, message } = request.body || {};

    if (!name || !email || !message) {
      return sendJson(response, 400, { message: 'Name, email, and message are required.' });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const mailTo = process.env.MAIL_TO || smtpUser;
    const mailFrom = process.env.MAIL_FROM || smtpUser;

    if (!smtpHost || !smtpUser || !smtpPass || !mailTo || !mailFrom) {
      return sendJson(response, 500, { message: 'Email service is not configured yet. Please set SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_FROM, and MAIL_TO.' });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${mailFrom}>`,
      to: mailTo,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        message
      ].join('\n'),
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `
    });

    return sendJson(response, 200, { message: 'Message sent successfully.' });
  } catch (error) {
    const gmailAuthFailed = error && (error.code === 'EAUTH' || error.responseCode === 535);
    const message = gmailAuthFailed
      ? 'Gmail login failed. Use a Gmail App Password in SMTP_PASS, not your normal Gmail password.'
      : 'Message could not be sent. Please check SMTP settings and try again.';

    return sendJson(response, 500, { message });
  }
};
