import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/contact
 *
 * Validates the incoming contact form data and sends an email
 * to mitanshkanani@outlook.com via the Resend API.
 *
 * REQUIRED environment variable (in .env.local):
 *   RESEND_API_KEY — your Resend API key (starts with re_)
 */

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body as {
            name?: string;
            email?: string;
            message?: string;
        };

        // ── Server-side validation ──────────────────────────────────────
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return NextResponse.json(
                { error: "All fields (name, email, message) are required." },
                { status: 400 }
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }

        // ── Check for API key ───────────────────────────────────────────
        const apiKey = process.env.RESEND_API_KEY || process.env.RESENDAPIKEY;

        if (!apiKey) {
            console.error(
                "[Contact API] Missing RESEND_API_KEY. " +
                    "Add it to .env.local to enable the contact form."
            );
            return NextResponse.json(
                {
                    error:
                        "Contact form is not yet configured. Please reach out via email at mitanshkanani@outlook.com.",
                },
                { status: 500 }
            );
        }

        // ── Send email via Resend ───────────────────────────────────────
        const resend = new Resend(apiKey);

        const { error } = await resend.emails.send({
            from: "Mitansh Portfolio <onboarding@resend.dev>",
            to: "mitanshkanani@outlook.com",
            subject: `New Contact Message from ${name.trim()}`,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
                    <h2 style="margin: 0 0 24px; font-size: 20px; font-weight: 600; color: #111;">
                        New message from your portfolio
                    </h2>

                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 13px; color: #666; width: 80px; vertical-align: top;">Name</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 15px; font-weight: 500;">${name.trim()}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 13px; color: #666; vertical-align: top;">Email</td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 15px;">
                                <a href="mailto:${email.trim()}" style="color: #2563eb; text-decoration: none;">${email.trim()}</a>
                            </td>
                        </tr>
                    </table>

                    <div style="padding: 16px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e5e5;">
                        <p style="margin: 0 0 4px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
                        <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message.trim()}</p>
                    </div>

                    <p style="margin-top: 24px; font-size: 12px; color: #999;">
                        Sent via the portfolio contact form · ${new Date().toISOString()}
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error("[Contact API] Resend error:", error);
            return NextResponse.json(
                { error: "Failed to send message. Please try again later." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Message sent successfully! I'll get back to you soon." },
            { status: 200 }
        );
    } catch (error) {
        console.error("[Contact API] Error:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}
