const { validationResult } = require('express-validator');
const esClient = require('../config/elasticsearch')

const ingestLog = async (req, res) => {
    // Validate JSON format
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const logData = req.body;
    try {
        // Index the log data in Elasticsearch
        await esClient.index({
            index: process.env.ELASTICSEARCH_INDEX || 'logs',
            body: logData,
        });
        res.status(200).send('Log received and indexed successfully');
    } catch (error) {
        console.error('Error indexing log data to Elasticsearch:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    ingestLog
}