import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Susan Loomis Website <onboarding@resend.dev>",
        to: ["victor.perez2867@gmail.com"],
        reply_to: email,
        subject: `New message from susanloomis.com — ${subject || "Contact Form"}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem;">
            <h2 style="color: #a8382a; font-size: 1.5rem; margin-bottom: 1rem;">
              New message from susanloomis.com
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 0.5rem 0; font-weight: bold; width: 100px; color: #6e6660;">Name:</td>
                <td style="padding: 0.5rem 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; font-weight: bold; color: #6e6660;">Email:</td>
                <td style="padding: 0.5rem 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 0.5rem 0; font-weight: bold; color: #6e6660;">Subject:</td>
                <td style="padding: 0.5rem 0;">${subject || "—"}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #ede8df; margin: 1.5rem 0;" />
            <p style="font-weight: bold; color: #6e6660; margin-bottom: 0.5rem;">Message:</p>
            <p style="line-height: 1.75; white-space: pre-wrap;">${message}</p>
            <hr style="border: none; border-top: 1px solid #ede8df; margin: 1.5rem 0;" />
            <p style="color: #6e6660; font-size: 12px;">
              Sent from the contact form at susanloomis.com
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}