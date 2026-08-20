import { NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Server-side handler that validates the incoming contact form data and
 * appends a row to the configured Google Sheet via the Sheets API.
 *
 * REQUIRED environment variables (in .env.local):
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  — the service account email
 *   GOOGLE_PRIVATE_KEY            — the PEM private key (with escaped newlines)
 *
 * The Google Sheet must share editor access with the service account email.
 *
 * Target spreadsheet ID (from the URL provided):
 *   1O3XtxJnc3Nc11xG25UYzWMOzNlTVua1CDpoZ48mwIw4
 */

const SPREADSHEET_ID = "1O3XtxJnc3Nc11xG25UYzWMOzNlTVua1CDpoZ48mwIw4";
const SHEET_RANGE = "Sheet1!A:D"; // Name, Email, Message, Timestamp

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body as {
            name?: string;
            email?: string;
            message?: string;
        };

        // Server-side validation
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

        // Check for required environment variables
        const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY;

        if (!serviceAccountEmail || !privateKey) {
            console.warn(
                "[Contact API] Missing Google Sheets credentials. " +
                "Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in .env.local"
            );
            return NextResponse.json(
                {
                    error:
                        "Contact form is not yet configured. Please reach out via email at mitanshkanani@outlook.com.",
                },
                { status: 503 }
            );
        }

        // Dynamically import googleapis only when credentials are available
        const { google } = await import("googleapis");

        const auth = new google.auth.JWT({
            email: serviceAccountEmail,
            key: privateKey.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        const timestamp = new Date().toISOString();

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: SHEET_RANGE,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[name.trim(), email.trim(), message.trim(), timestamp]],
            },
        });

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
