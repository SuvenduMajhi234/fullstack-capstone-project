const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./models/db');
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes'); // searchRoutes ইমপোর্ট করা হয়েছে

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ডাটাবেস কানেকশন চেক
connectToDatabase();

// এন্ডপয়েন্টগুলো রেজিস্টার করা
app.use('/api/gifts', giftRoutes);

// Task 7: /api/search রুটটি রেজিস্টার করা
app.use('/api/search', searchRoutes); 

app.get('/', (req, res) => {
    res.send("GiftLink API is running...");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
