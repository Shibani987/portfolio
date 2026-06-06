# Shibani Portfolio

Static portfolio site with a Vercel serverless contact API.

## Local Development

```bash
npm install
npm run dev
```

## Vercel Environment Variables

Set these in Vercel Project Settings > Environment Variables:

```text
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
MAIL_FROM
MAIL_TO
```

For Gmail, use an App Password for `SMTP_PASS`.

## Deploy

```bash
npm run deploy
npm run deploy:prod
```
