const { MongoClient } = require('mongodb');

async function dbconnect() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
    // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected successfully to server");

    // Access a database
        const db = client.db("DRCSS");
    
    }
    catch (e) {
        console.error(e);   
    }
}

dbconnect().catch(console.error);


document.addEventListener('DOMContentLoaded', () => {
check();
const argon2 = require('argon2');
const { sendVerificationEmail } = require('./email');
const signup = document.getElementById('signup');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const emailInput = document.getElementById('emailInput');
const passwordConfirmInput = document.getElementById('passwordConfirmInput');
const codeinput = document.getElementById('codeinput');

process.on('exit', async (code) => {
    console.log(`Script exited with code: ${code}`);
    await client.close();
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

signup.addEventListener('codesend', (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    sendVerificationEmail(email, verificationToken)
        .then(response => {
            if (response.success) {
                console.log('Verification email sent successfully.');
            } else {
                console.error('Failed to send verification email:', response.message);
            }
        })
        .catch(err => {
            console.error('Error sending verification email:', err);
        });
});

signup.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;
    const passwordConfirm = passwordConfirmInput.value;
    const codein =  codeinput.value;    

    if (password !== passwordConfirm) {
        console.error('Passwords do not match.');
        return;
    }
    else if (codein !== verificationToken) {
        console.log('code verify failed!');
    } else {
        argon2.hash(password)
            .then(hash => {
                console.log('Password hashed successfully:', hash);
                const newUser = {  username: username, email: email, password: hash  };
                db.collection('users').insertOne(newUser)
                    .then(result => {
                        console.log('User registered successfully:', result.insertedId);
                        window.location.href = 'login.html';
                    })
                    .catch(err => {
                        console.error('Error inserting user into database:', err);
                    });
            })
            .catch(err => {
                console.error('Error hashing password:', err);
                });
        }
    });
});

signup.addEventListener('codesend', (event) => {
    Content();
});
function Content() {
    unhide();
    delaybutton();
    console.log('code sent');
}

function delaybutton() {
    const button = document.getElementById('codesend');
    button.disabled = true;
    let countdown = 60;
    button.textContent = `Please wait ${countdown} seconds`;
    const interval = setInterval(() => {
        countdown--;
        button.textContent = `Please wait ${countdown} seconds`;
        if (countdown <= 0) {
            clearInterval(interval);
            button.disabled = false;
            button.textContent = 'Send Code';
        }
    }, 1000);
}

function unhide() {
    const hiddenSection = document.getElementById('vf');
    hiddenSection.style.display = 'block';
}