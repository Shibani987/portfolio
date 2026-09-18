# Shibani Portfolio

A personal portfolio website for showcasing selected projects, services, resume links, and a working contact form. The site is served through Vercel with a small serverless API for email delivery.

## Features

- Single-page portfolio experience powered by `cat.html`
- Project gallery with images, tech stacks, GitHub links, and live links
- Resume link in the main navigation
- Contact form backed by a Vercel serverless function
- Email sending through SMTP using Nodemailer
- Vercel rewrite from `/` to `/cat.html`

## Featured Projects

- **Plant SaaS** - Multi-tenant plant e-commerce platform with vendor inventory, order management, admin analytics, Razorpay payments, and store-level data isolation.
- **Nirbhaya** - Safety app built with HTML, CSS, JavaScript, Python, and Django.
- **LifeLink** - HealthTech project using React, Django, REST API, and SQL.
- **Artestix** - Responsive client site built with HTML, CSS, JavaScript, Flask, and MongoDB.

## Tech Stack

- HTML
- CSS
- JavaScript
- Vercel Serverless Functions
- Node.js
- Nodemailer

## Project Structure

```text
.
├── api/
│   └── contact.js
├── assets/
├── cat.html
├── package.json
├── vercel.json
└── README.md
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the Vercel development server:

```bash
npm run dev
```

The homepage is configured through `vercel.json` to rewrite `/` to `/cat.html`.

## Environment Variables

Set these variables in Vercel Project Settings > Environment Variables:

```text
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
MAIL_FROM
MAIL_TO
```

For Gmail, use an App Password for `SMTP_PASS` instead of your normal Gmail password.

## Contact API

The contact form sends a `POST` request to `api/contact.js` with:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Hello"
}
```

The API validates required fields and returns JSON responses for success, validation errors, unsupported methods, or SMTP configuration issues.

## Deploy

Deploy a preview build:

```bash
npm run deploy
```

Deploy to production:

```bash
npm run deploy:prod
```
