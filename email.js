require('dotenv').config();

// Import the Resend SDK instead of Nodemailer
const { Resend } = require('resend');

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(recipientEmail, verificationToken) {
    try {
        // 1. Define the email parameters for the Resend API.
        const sendOptions = {
            // The 'from' email MUST be a domain you've verified with Resend.
            from: process.env.RESEND_FROM_EMAIL, 
            to: recipientEmail,
            subject: 'Please Verify Your Account',
            html: `
                <p>Hello,</p>
                <p>Thank you for signing up! Please enter the code below to verify your email address:</p>
                <a>your code is <b>${verificationToken}</b></a>
                <p>This link will expire shortly.</p>
                <p>Thanks,<br>DRCSS Team</p>
            `
        };

        // 2. Send the email using the Resend API.
        const response = await resend.emails.send(sendOptions);
        
        // Check the response for success
        if (response.id) {
            console.log('Email sent successfully. ID:', response.id);
            return { success: true, message: 'Email sent successfully' };
        } else {
            // Handle specific errors that might not throw an exception but are returned in the response
            console.error('Error sending email from Resend:', response.error);
            return { success: false, message: response.error.message || 'Error sending email' };
        }

    } catch (error) {
        // Catch network or SDK-related exceptions
        console.error('Error sending email:', error);
        return { success: false, message: 'Error sending email' };
    }
}
