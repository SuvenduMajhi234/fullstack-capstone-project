const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(url);

async function connectToDatabase() {
    // এই লাইনটি থাকা বাধ্যতামূলক
    await client.connect(); 
    console.log("Connected successfully to MongoDB");
    return client.db("giftlink");
}

module.exports = connectToDatabase;
