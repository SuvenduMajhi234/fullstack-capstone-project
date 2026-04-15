const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const { ObjectId } = require('mongodb');

// Task 5: Get all gifts from the database
router.get('/', async (req, res) => {
    try {
        // connectToDatabase() মেথড ব্যবহার করে ডাটাবেস কানেকশন
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (e) {
        res.status(500).send("Error fetching gifts");
    }
});

// Task 5: Get a specific gift by ID
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const id = req.params.id;

        // নির্দিষ্ট আইডি দিয়ে গিফট খোঁজা
        const gift = await collection.findOne({ id: id });

        if (!gift) {
            return res.status(404).send("Gift not found");
        }

        res.json(gift);
    } catch (e) {
        res.status(500).send("Error fetching gift details");
    }
});

module.exports = router;
