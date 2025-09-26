const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://db1:darjart@cluster0.4ufoqfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri);

    try {
    // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected successfully to server");

    // Access a database
        const db = client.db("DRCSS");
    
    } finally {
        // Close the connection when done
        await client.close();
    }
}

main().catch(console.error);