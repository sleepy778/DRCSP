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
dbconnect();
const argon2 = require('argon2');
const signup = document.getElementById('signup');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const passwordConfirmInput = document.getElementById('passwordConfirmInput');

process.on('exit', async (code) => {
    console.log(`Script exited with code: ${code}`);
    localStorage.removeItem('email');
    localStorage.removeItem('verified');
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


signup.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = localStorage.getItem('username');
    const verified = localStorage.getItem('codeverified');
    const passwordConfirm = passwordConfirmInput.value;

    if (password !== passwordConfirm) {
        console.error('Passwords do not match.');
        return;
    }
    else if (verified !== 'true') {
        console.log('not verified!');
    } else {
        argon2.hash(password)
            .then(hash => {
                console.log('Password hashed successfully:', hash);
                const newUser = {  username: username, email: email, password: hash  };
                db.collection('users').insertOne(newUser)
                    .then(result => {
                        console.log('User registered successfully:', result.insertedId);
                        localStorage.removeItem('email');
                        localStorage.removeItem('verificationToken');
                        localStorage.removeItem('codeverified');
                        localStorage.setItem('loggedin', 'true');
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