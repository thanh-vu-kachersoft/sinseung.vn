import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * API route to handle contact form submissions and send emails via SMTP.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, country, whatsapp, company, message } = data;

    // 1. Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, or message)" },
        { status: 400 },
      );
    }

    const host = process.env.EMAIL_SERVER_HOST;
    const user = process.env.EMAIL_SERVER_USER;
    const pass = process.env.EMAIL_SERVER_PASSWORD;
    const port = process.env.EMAIL_SERVER_PORT || "465";

    // Debugging: Log configuration presence
    console.log("Email Config Check:", {
      host: !!host,
      user: !!user,
      pass: !!pass,
      port: port,
    });

    // 2. Strict check for configuration
    if (!host || !user || !pass) {
      return NextResponse.json(
        {
          error: "Email configuration missing on server",
          details: "Please check .env.local file and RESTART the server.",
          code: "CONFIG_MISSING",
        },
        { status: 500 },
      );
    }

    // 3. SMTP Configuration
    const transporter = nodemailer.createTransport({
      host: host,
      port: parseInt(port),
      secure: true, // For port 465
      auth: {
        user: user,
        pass: pass.replace(/\s/g, ""), // Remove any accidental spaces in the 16-char password
      },
    });

    // 4. Verify connection before sending
    try {
      await transporter.verify();
      console.log("SMTP Connection verified successfully");
    } catch (verifyError: unknown) {
      console.error("SMTP Verification Failed:", verifyError);
      const err = verifyError as { message?: string; code?: string | number };
      return NextResponse.json(
        {
          error: "Could not connect to email server",
          details: err.message,
          code: String(err.code || ""),
        },
        { status: 500 },
      );
    }

    // 5. Prepare Email content
    const mailOptions = {
      from: `"Website Contact Form" <${user}>`,
      to: "thanhvu@phuthaitech.com.vn",
      subject: `[Website Inquiry] New Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #C8102E; border-bottom: 2px solid #C8102E; padding-bottom: 10px;">New Contact Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Name:</strong></td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Email:</strong></td><td>${email}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Country:</strong></td><td>${country || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Phone:</strong></td><td>${whatsapp || "N/A"}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;"><strong>Company:</strong></td><td>${company || "N/A"}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #fdfdfd; border: 1px dashed #ccc;">
            <strong>Message:</strong><br />
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 11px; color: #999; margin-top: 30px;">Sent from Sinseung Tools Website</p>
        </div>
      `,
    };

    // 6. Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to thanhvu@phuthaitech.com.vn");

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error: unknown) {
    console.error("Fatal Error in Contact API:", error);
    const err = error as { message?: string; code?: string | number };
    return NextResponse.json(
      {
        error: "Server Error",
        details: err.message,
        code: String(err.code || "UNKNOWN_ERROR"),
      },
      { status: 500 },
    );
  }
}
