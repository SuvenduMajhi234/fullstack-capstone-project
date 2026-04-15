const express = require('express');
const axios = require('axios');
const logger = require('./logger');
const expressAsyncHandler = require('express-async-handler');
// Task 8: Import the natural npm package
const natural = require('natural'); 

const router = express.Router();

router.post('/', expressAsyncHandler(async (req, res) => {
    const { sentence } = req.query;
    const logger = req.logger;

    if (!sentence) {
        logger.error('No sentence provided');
        return res.status(400).json({ error: 'No sentence provided' });
    }

    // Sentiment Analysis logic using natural package
    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");
    
    const words = sentence.split(/\s+/);
    const score = analyzer.getSentiment(words);

    let sentiment = 'neutral';
    if (score > 0) {
        sentiment = 'positive';
    } else if (score < 0) {
        sentiment = 'negative';
    }

    logger.info(`Sentiment analysis completed for: ${sentence}`);
    res.status(200).json({ score, sentiment });
}));

module.exports = router;
