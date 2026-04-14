import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, phone, service, description } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Karigor Interior" <${process.env.GMAIL_USER}>`,
      to: "karigorinterior55@gmail.com",
      replyTo: email,
      subject: `New Enquiry from ${name}${service ? ` — ${service}` : ""}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; color: #322D29;">
          <h2 style="border-bottom: 2px solid #72383D; padding-bottom: 12px;">New Enquiry — Karigor Interior</h2>
          <table style="width:100%; border-collapse: collapse; margin-top: 24px;">
            <tr><td style="padding: 10px 0; font-weight: bold; width: 140px;">Name</td><td>${name}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold;">Phone</td><td>${phone || "—"}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold;">Service</td><td>${service || "—"}</td></tr>
            <tr><td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Description</td><td>${description || "—"}</td></tr>
          </table>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Enquiry email failed:", err);
    return Response.json({ success: false }, { status: 500 });
  }
}
