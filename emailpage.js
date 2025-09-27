        const { sendVerificationEmail } = require('./email');
        const emailInput = document.getElementById('email');
        const messageBox = document.getElementById('message-box');

        function showMessage(message, type) {
            messageBox.textContent = message;
            messageBox.className = `text-center text-sm p-3 rounded-lg ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
            messageBox.classList.remove('hidden');
        }

        function handleLogin() {
            const email = emailInput.value;
            if (email) {
                // Here you would typically send the email to your server
                console.log('Email submitted:', email);
                localStorage.setItem('email', email);
                const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
                localStorage.setItem('verificationToken', verificationToken);
                sendVerificationEmail(email, verificationToken);
                showMessage('Sending verification code...', 'success');
                
                // Simulate redirecting to the 2-step verification page after a short delay
                setTimeout(() => {
                    // In a real application, you would navigate to the next page.
                    // For this example, we'll just log it.
                    window.location.href = 'drcsp.vercel.app/email.html'; // Redirect to 2-step verification page
                    console.log('Redirecting to 2-step verification page.');
                }, 1500);

            } else {
                showMessage('Please enter a valid email address.', 'error');
            }
        }
        
        // Auto-focus the input on page load
        window.onload = () => {
            emailInput.focus();
        };