const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: "rjingarnsd@gmail.com",
    pass: "yavu vfes laqk ijrj",
  },
});

const sendWelcomeEmail = (email, name) => {
  transporter.sendMail({
    from: "rjingarnsd@gmail.com",
    to: email,
    subject: "Welcome to School Admin Dashboard! 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 10px;">
        <h2 style="color: #2563eb; text-align: center;">Welcome ${name}!</h2>
        <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p>Your admin account has been created successfully.</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 1px solid #e5e7eb;">
          <p style="color: #059669;">✅ Login now to manage students, teachers & courses.</p>
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br><strong>School Management Team</strong>
          </p>
        </div>
      </div>
    `,
  });
};

const sendLoginNotification = (email, name) => {
  transporter.sendMail({
    from: "rjingarnsd@gmail.com",
    to: email,
    subject: "Admin Login Successful",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <p>Hi <strong>${name}</strong>,</p>
        <p>You logged in at <strong>${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</strong></p>
        <p>If this wasn't you, please contact support immediately.</p>
      </div>
    `
  });
};

module.exports = {
  sendWelcomeEmail,
  sendLoginNotification
};
