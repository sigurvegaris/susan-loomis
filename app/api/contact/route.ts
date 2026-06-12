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
        from: "Susan Loomis Website <contact@susanloomis.com>",
        to: ["susan@onruetatin.com"],
        cc: ["victor.perez2867@gmail.com"],
        reply_to: email,
        subject: `New message from susanloomis.com — ${subject || "Contact Form"}`,
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 2rem; color: #1a1714;">
            <p>A message has been submitted via the contact form on susanloomis.com.</p>
            <br/>
            <p>NAME:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${name}</p>
            <p>EMAIL:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="mailto:${email}">${email}</a></p>
            <p>SUBJECT:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${subject || "—"}</p>
            <br/>
            <p>MESSAGE:</p>
            <p>${message}</p>
            <br/>
            <p>---</p>
            <p>Reply to this email to contact the sender directly.</p>
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