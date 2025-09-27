        const { sendVerificationEmail } = require('./email');
        const otpContainer = document.getElementById('otp-container');
        const inputs = [...otpContainer.children];
        const messageBox = document.getElementById('message-box');

        // Function to show a styled message
        function showMessage(message, type) {
            messageBox.textContent = message;
            messageBox.className = `text-center text-sm p-3 rounded-lg ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
            messageBox.classList.remove('hidden');
        }

        otpContainer.addEventListener('input', (e) => {
            const target = e.target;
            const val = target.value;
            // Only allow numbers
            if (isNaN(val)) {
                target.value = '';
                return;
            }

            if (val !== '') {
                const next = target.nextElementSibling;
                if (next) {
                    next.focus();
                }
            }
        });

        otpContainer.addEventListener('keyup', (e) => {
            const target = e.target;
            const key = e.key.toLowerCase();

            if (key === 'backspace' || key === 'delete') {
                target.value = '';
                const prev = target.previousElementSibling;
                if (prev) {
                    prev.focus();
                }
                return;
            }
        });

        // Handle pasting
        inputs[0].addEventListener('paste', (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text').slice(0, 6);
            inputs.forEach((input, i) => {
                if (i < text.length) {
                    input.value = text[i];
                } else {
                    input.value = '';
                }
            });
            // Focus the last filled input or the first if paste is short
            const lastFilledIndex = Math.min(text.length - 1, 5);
            if (lastFilledIndex >= 0) {
                inputs[lastFilledIndex].focus();
            }
        });
        
        // Handle form submission
        function handleVerification() {
            let otp = '';
            inputs.forEach(input => {
                otp += input.value;
            });

            if (otp.length === 6) {
                // Here you would typically send the OTP to your server for verification
                console.log('Verifying OTP:', otp);
                if (otp === localStorage.getItem('verificationToken')) {
                    showMessage('Verification successful! You can now proceed.', 'success');
                    localStorage.setItem('codeverified', 'true');
                    setTimeout(() => {
                        window.location.href = 'signup.html'; // Redirect to signup page
                    }, 2000);
                } else {
                    showMessage('Invalid code. Please try again.', 'error');
                }
            } else {
                showMessage('Please enter all 6 digits of the code.', 'error');
            }
        }
        
        // Handle resend code
        function resendCode() {
            console.log('Resending code...');
            sendVerificationEmail(localStorage.getItem('email'),localStorage.getItem('verificationToken'))
                .then(response => {
                    if (response.success) {
                        showMessage('A new verification code has been sent to your email.', 'success');
                    } else {
                        showMessage('Failed to resend code. Please try again later.', 'error');
                    }
                })
                .catch(err => {
                    console.error('Error resending code:', err);
                    showMessage('An error occurred. Please try again later.', 'error');
                });
            inputs.forEach(input => input.value = '');
            inputs[0].focus();
        }

        // Auto-focus the first input on page load
        window.onload = () => {
            inputs[0].focus();
        };