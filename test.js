import { sendVerificationEmail } from './email.js';
const email = 'coolguy77756@gmail.com';
const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
sendVerificationEmail(email, verificationToken);