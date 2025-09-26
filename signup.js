const { MongoClient } = require('mongodb');

async function dbconnect() {
    const uri = "mongodb+srv://db1:darjart@cluster0.4ufoqfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

// 1. Get references to the form and input fields
const signup = document.getElementById('signup');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const emailInput = document.getElementById('emailInput');
const passwordConfirmInput = document.getElementById('passwordConfirmInput');

process.on('exit', (code) => {
    console.log(`Script exited with code: ${code}`);
    await client.close();
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});


signup.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    if (password !== passwordConfirm) {
        console.error('Passwords do not match.');
        return;
    }
    else {
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