import nodemailer from "nodemailer";

export async function POST(request) {
  // Parse the incoming JSON
  const { name, phone, email, message } = await request.json();

  // Create a transporter using SMTP details from environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Prepare the email options with mobile number and name in the body
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.SMTP_TO,
    subject: "Enquiry from Website",
    text: `Name: ${name}\nMobile: ${phone}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Mobile:</strong> ${phone}</p>
           <p><strong>Message:</strong> ${message}</p>`
  };

  try {
    // Send email via nodemailer
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Message sent successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to send message." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
