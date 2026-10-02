import { NextRequest } from "next/server";
import transporter from "@/lib/nodemailer";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

const skillLabels: Record<string, string> = {
  teaching: "Slum Digital Tutoring & English Classes",
  medical: "Healthcare Camp Diagnostic Support",
  food: "Slum Food Drive Kitchen Assistance",
  marketing: "Social Media Marketing & Photography",
  administration: "Event Organization & Back-Office Operations",
};

const availabilityLabels: Record<string, string> = {
  weekends: "Saturdays & Sundays (Ground Drives)",
  weekdays: "Monday to Friday (Remote Support)",
  both: "Flexible (Ground & Remote)",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, city, skills, availability, message } = body;

    // --- Basic server-side validation ---
    if (!name || !email || !phone || !city || !skills || !availability || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "long",
      timeStyle: "short",
    });

    // ─── 1. Admin Alert Email ──────────────────────────────────────────────
    const adminHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>New Volunteer Application</title>
      </head>
      <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%);padding:32px 40px;text-align:center;">
                  <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:2px;color:#93c5fd;text-transform:uppercase;">SewaPrith Foundation</p>
                  <h1 style="margin:8px 0 0;font-size:24px;font-weight:800;color:#ffffff;">🙌 New Volunteer Application</h1>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:36px 40px;">
                  <p style="margin:0 0 24px;font-size:14px;color:#64748b;">A new volunteer has submitted their application. Details are listed below:</p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                    <tr style="background:#f8fafc;">
                      <td style="padding:12px 16px;font-weight:700;color:#475569;width:40%;border-bottom:1px solid #e2e8f0;">Full Name</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">Email Address</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td>
                    </tr>
                    <tr style="background:#f8fafc;">
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">Mobile Number</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;"><a href="tel:${phone}" style="color:#2563eb;">${phone}</a></td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">City</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${city}</td>
                    </tr>
                    <tr style="background:#f8fafc;">
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">Skill Area</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${skillLabels[skills] ?? skills}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">Availability</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${availabilityLabels[availability] ?? availability}</td>
                    </tr>
                    <tr style="background:#f8fafc;">
                      <td style="padding:12px 16px;font-weight:700;color:#475569;vertical-align:top;">Message</td>
                      <td style="padding:12px 16px;color:#1e293b;line-height:1.6;">${message}</td>
                    </tr>
                  </table>
                  <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;text-align:right;">Submitted at: ${submittedAt} IST</p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                  <p style="margin:0;font-size:11px;color:#94a3b8;">SewaPrith Welfare Foundation · Automated Notification System</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    // ─── 2. Welcome Confirmation Email ────────────────────────────────────
    const welcomeHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Welcome to SewaPrith Foundation</title>
      </head>
      <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%);padding:40px;text-align:center;">
                  <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:2px;color:#93c5fd;text-transform:uppercase;">SewaPrith Foundation</p>
                  <h1 style="margin:10px 0 0;font-size:26px;font-weight:800;color:#ffffff;">Welcome, ${name}! 🎉</h1>
                  <p style="margin:10px 0 0;font-size:14px;color:#bfdbfe;">Your volunteer application has been received.</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:36px 40px;">
                  <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.7;">Thank you for stepping up and choosing to serve with <strong style="color:#1e3a5f;">SewaPrith Foundation</strong>. Your generosity of time and skills means the world to the communities we serve.</p>

                  <div style="background:#eff6ff;border-left:4px solid #2563eb;border-radius:8px;padding:16px 20px;margin:24px 0;">
                    <p style="margin:0;font-size:13px;font-weight:700;color:#1d4ed8;">📋 Your Application Summary</p>
                    <p style="margin:8px 0 0;font-size:13px;color:#3b82f6;line-height:1.6;">
                      <strong>Role:</strong> ${skillLabels[skills] ?? skills}<br/>
                      <strong>Availability:</strong> ${availabilityLabels[availability] ?? availability}<br/>
                      <strong>City:</strong> ${city}
                    </p>
                  </div>

                  <p style="margin:0 0 12px;font-size:14px;color:#475569;line-height:1.7;"><strong style="color:#1e293b;">What happens next?</strong></p>
                  <ol style="margin:0;padding-left:20px;font-size:14px;color:#64748b;line-height:2;">
                    <li>Our community coordinator will review your application.</li>
                    <li>You'll receive a WhatsApp message within <strong>48 hours</strong> to be added to our volunteers channel.</li>
                    <li>We'll match you to an upcoming drive based on your skills and availability.</li>
                  </ol>

                  <p style="margin:28px 0 0;font-size:14px;color:#475569;line-height:1.7;">In the meantime, explore our ongoing campaigns and stay updated at <a href="https://sewaprith.org" style="color:#2563eb;font-weight:700;">sewaprith.org</a>.</p>

                  <p style="margin:24px 0 0;font-size:14px;color:#1e293b;">With gratitude,<br/><strong>The SewaPrith Foundation Team</strong></p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                  <p style="margin:0;font-size:11px;color:#94a3b8;">SewaPrith Welfare Foundation · Registered NGO · sewaprith.org</p>
                  <p style="margin:6px 0 0;font-size:11px;color:#94a3b8;">This is an automated email. Please do not reply directly to this message.</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    // ─── Send both emails ─────────────────────────────────────────────────
    await Promise.all([
      transporter.sendMail({
        from: `"SewaPrith Foundation" <${process.env.EMAIL_USER}>`,
        to: ADMIN_EMAIL,
        subject: `🙌 New Volunteer Application — ${name} (${city})`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: `"SewaPrith Foundation" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to SewaPrith Foundation — Application Received!",
        html: welcomeHtml,
      }),
    ]);

    return Response.json({ success: true });
  } catch (error) {
    console.error("[/api/register] Error:", error);
    return Response.json(
      { error: "Failed to send emails. Please try again later." },
      { status: 500 }
    );
  }
}
