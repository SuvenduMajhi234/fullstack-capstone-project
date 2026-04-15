const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Task 11: Login Endpoint using findOne
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const db = await connectToDatabase();
        const collection = db.collection("users");

        // Task 11: findOne method attribute to find the user by email
        const theUser = await collection.findOne({ email: email });

        if (theUser) {
            // পাসওয়ার্ড চেক করা
            const checkPassword = await bcrypt.compare(password, theUser.password);
            if (checkPassword) {
                const payload = { user: { id: theUser.id } };
                const token = jwt.sign(payload, process.env.JWT_SECRET);
                res.json({ token, email });
            } else {
                res.status(400).json({ error: 'Invalid password' });
            }
        } else {
            res.status(400).json({ error: 'User not found' });
        }
    } catch (e) {
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
