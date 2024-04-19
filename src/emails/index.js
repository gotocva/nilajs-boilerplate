

import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
const env = dotenv.config().parsed;

export const transport = nodemailer.createTransport({
  host: env.SMTP_HOST || "smtp.zoho.com",
  port: env.SMTP_PORT || 587,
  auth: {
    user: env.SMTP_EMAIL || "contact@sivabharathy.in",
    pass: env.SMTP_PASSWORD || "ntnxMHjqcYfr"
  }
});