require('dotenv').config();

const nodemailer = require('nodemailer');
async function sendVerificationEmail(recipientEmail, verificationToken) {
    try {
        // 1. Create a transporter object using a service like Gmail, or a custom SMTP server.
        // Use environment variables for secure access to credentials.
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services or your own SMTP
            auth: {
                user: process.env.EMAIL_USER, // Your email address from .env
                pass: process.env.EMAIL_PASS  // Your app password from .env
            }
        });

        // 2. Define the email content and recipient details.
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: 'Please Verify Your Account',
            html: `
                <p>Hello,</p>
                <p>Thank you for signing up! Please enter the code below to verify your email address:</p>
                <a>your code is ${verificationToken}</a>
                <p>This link will expire in 24 hours.</p>
                <p>Thanks,<br>DRCSS Team</p>
            `
        };

        // 3. Send the email.
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return { success: true, message: 'Email sent successfully' };

    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Error sending email' };
    }
}

module.exports = { sendVerificationEmail };