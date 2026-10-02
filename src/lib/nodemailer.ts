import nodemailer from "nodemailer";

/**
 * Reusable Gmail SMTP transporter singleton.
 *
 * Requires the following environment variables in .env.local:
 *   EMAIL_USER  – Gmail address (e.g. sevaprithfoundation@gmail.com)
 *   EMAIL_PASS  – 16-digit Gmail App Password (NOT your account password)
 *
 * To generate an App Password:
 *   1. Enable 2-Step Verification on the Google account.
 *   2. Google Account → Security → App Passwords → Create (Mail / Other).
 *   3. Paste the 16-digit key as EMAIL_PASS in .env.local.
 */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;
