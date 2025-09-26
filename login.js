document.addEventListener('DOMContentLoaded', () => {

// 1. Get references to the form and input fields
const login = document.getElementById('login');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');

login.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    argon2.verify(storedHash, password)
        .then(isVerified => {
            if (isVerified) {
                console.log('Password verified successfully!');
            } else {
                console.log('Invalid password.');
            }
        })
    .catch(err => {
    // Handle errors (e.g., stored hash is corrupted)
            console.error(err);
        });
    });
});