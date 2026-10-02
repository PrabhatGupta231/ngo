import { NextRequest } from "next/server";
import transporter from "@/lib/nodemailer";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      amount,
      campaign,
      transactionRef,
      claimTax,
      pan,
      address,
    } = body;

    // --- Basic server-side validation ---
    if (!name || !email || !phone || !amount || !transactionRef) {
      return Response.json(
        { error: "Name, email, phone, amount, and transaction reference are required." },
        { status: 400 }
      );
    }
    if (claimTax && (!pan || !address)) {
      return Response.json(
        { error: "PAN and address are required to claim 80G tax benefit." },
        { status: 400 }
      );
    }

    const formattedAmount = Number(amount).toLocaleString("en-IN");
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "long",
      timeStyle: "short",
    });

    // ─── 1. Admin Alert Email ─────────────────────────────────────────────
    const adminHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>New Donation Received</title>
      </head>
      <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#7c2d12 0%,#ea580c 100%);padding:32px 40px;text-align:center;">
                  <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:2px;color:#fed7aa;text-transform:uppercase;">SewaPrith Foundation</p>
                  <h1 style="margin:8px 0 0;font-size:24px;font-weight:800;color:#ffffff;">💰 New Donation Alert</h1>
                  <p style="margin:8px 0 0;font-size:28px;font-weight:900;color:#fef3c7;">₹${formattedAmount}</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:36px 40px;">
                  <p style="margin:0 0 24px;font-size:14px;color:#64748b;">A donation has been submitted. Full details are below:</p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                    <tr style="background:#f8fafc;">
                      <td style="padding:12px 16px;font-weight:700;color:#475569;width:40%;border-bottom:1px solid #e2e8f0;">Donor Name</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">Email Address</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;"><a href="mailto:${email}" style="color:#ea580c;">${email}</a></td>
                    </tr>
                    <tr style="background:#f8fafc;">
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">Contact Number</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;"><a href="tel:${phone}" style="color:#ea580c;">${phone}</a></td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">Donation Amount</td>
                      <td style="padding:12px 16px;font-weight:900;font-size:16px;color:#ea580c;border-bottom:1px solid #e2e8f0;">₹${formattedAmount}</td>
                    </tr>
                    <tr style="background:#f8fafc;">
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">Campaign</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${campaign ?? "General Welfare Fund"}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">Transaction Ref</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;font-family:monospace;">${transactionRef}</td>
                    </tr>
                    <tr style="background:#f8fafc;">
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">Date &amp; Time</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${submittedAt} IST</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">80G Tax Claim</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${claimTax ? "Yes" : "No"}</td>
                    </tr>
                    ${
                      claimTax
                        ? `
                    <tr style="background:#f8fafc;">
                      <td style="padding:12px 16px;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0;">PAN Number</td>
                      <td style="padding:12px 16px;color:#1e293b;border-bottom:1px solid #e2e8f0;font-family:monospace;">${pan?.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td style="padding:12px 16px;font-weight:700;color:#475569;">Address</td>
                      <td style="padding:12px 16px;color:#1e293b;">${address}</td>
                    </tr>
                    `
                        : ""
                    }
                  </table>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                  <p style="margin:0;font-size:11px;color:#94a3b8;">SewaPrith Welfare Foundation · Automated Donation Alert</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    // ─── 2. Donor Receipt Email ───────────────────────────────────────────
    const donorHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Donation Receipt — SewaPrith Foundation</title>
      </head>
      <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%);padding:40px;text-align:center;">
                  <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:2px;color:#93c5fd;text-transform:uppercase;">SewaPrith Foundation</p>
                  <h1 style="margin:10px 0 0;font-size:26px;font-weight:800;color:#ffffff;">Thank You, ${name}! ❤️</h1>
                  <p style="margin:10px 0 0;font-size:15px;color:#bfdbfe;">Your donation of <strong style="font-size:22px;color:#fef3c7;">₹${formattedAmount}</strong> has been received.</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:36px 40px;">
                  <p style="margin:0 0 20px;font-size:15px;color:#334155;line-height:1.7;">Your generosity directly funds food drives, educational kits, and healthcare camps that transform lives across India. This is your official donation receipt.</p>

                  <!-- Receipt Box -->
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:24px;">
                    <p style="margin:0 0 16px;font-size:13px;font-weight:800;color:#475569;letter-spacing:1px;text-transform:uppercase;">🧾 Donation Receipt</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;border-collapse:collapse;">
                      <tr>
                        <td style="padding:6px 0;color:#64748b;width:50%;">Donor Name</td>
                        <td style="padding:6px 0;color:#1e293b;font-weight:700;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#64748b;">Donation Amount</td>
                        <td style="padding:6px 0;color:#1e293b;font-weight:700;">₹${formattedAmount}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#64748b;">Campaign</td>
                        <td style="padding:6px 0;color:#1e293b;font-weight:700;">${campaign ?? "General Welfare Fund"}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#64748b;">Transaction Ref</td>
                        <td style="padding:6px 0;color:#1e293b;font-weight:700;font-family:monospace;">${transactionRef}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#64748b;">Date &amp; Time</td>
                        <td style="padding:6px 0;color:#1e293b;font-weight:700;">${submittedAt} IST</td>
                      </tr>
                    </table>
                  </div>

                  ${
                    claimTax
                      ? `
                  <!-- 80G Notice -->
                  <div style="background:#fefce8;border:1px solid #fde68a;border-radius:12px;padding:20px;margin-bottom:24px;">
                    <p style="margin:0 0 8px;font-size:13px;font-weight:800;color:#92400e;">📄 Section 80G Tax Exemption</p>
                    <p style="margin:0;font-size:13px;color:#78350f;line-height:1.6;">Your 80G tax-exemption certificate will be generated and emailed to <strong>${email}</strong> within <strong>24–48 business hours</strong>. Keep this email as a reference until then.</p>
                    <p style="margin:8px 0 0;font-size:12px;color:#92400e;">PAN on record: <strong style="font-family:monospace;">${pan?.toUpperCase()}</strong></p>
                  </div>
                  `
                      : ""
                  }

                  <p style="margin:0 0 4px;font-size:14px;color:#1e293b;font-weight:700;">Warm regards,</p>
                  <p style="margin:0;font-size:14px;color:#475569;">The SewaPrith Foundation Team</p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
                  <p style="margin:0;font-size:11px;color:#94a3b8;">SewaPrith Welfare Foundation · Registered NGO · sewaprith.org</p>
                  <p style="margin:6px 0 0;font-size:11px;color:#94a3b8;">This is an automated receipt. Please do not reply directly to this message.</p>
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
        subject: `💰 New Donation ₹${formattedAmount} — ${name} [${transactionRef}]`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: `"SewaPrith Foundation" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Donation Receipt ₹${formattedAmount} — SewaPrith Foundation (Ref: ${transactionRef})`,
        html: donorHtml,
      }),
    ]);

    return Response.json({ success: true, transactionRef });
  } catch (error) {
    console.error("[/api/donate] Error:", error);
    return Response.json(
      { error: "Failed to send confirmation emails. Please try again later." },
      { status: 500 }
    );
  }
}
