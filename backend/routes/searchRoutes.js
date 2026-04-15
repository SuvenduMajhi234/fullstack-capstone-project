const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Task 6: Search and filter gifts
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        // ক্যাটাগরি ফিল্টার করার জন্য কুয়েরি অবজেক্ট তৈরি
        let query = {};

        // যদি ইউআরএল-এ ক্যাটাগরি থাকে (e.g. ?category=Electronics)
        if (req.query.category) {
            query.category = req.query.category;
        }

        // নাম দিয়ে সার্চ করার সুবিধা (ঐচ্ছিক কিন্তু ভালো)
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: "i" };
        }

        const gifts = await collection.find(query).toArray();
        res.json(gifts);
    } catch (e) {
        res.status(500).send("Error searching for gifts");
    }
});

module.exports = router;
