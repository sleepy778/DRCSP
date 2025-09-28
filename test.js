import { sendVerificationEmail } from './email.js';
const email = '28dmartinez@lorainschools.org';
const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
sendVerificationEmail(email, verificationToken);