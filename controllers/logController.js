const { validationResult } = require('express-validator');
const esClient = require('../config/elasticsearch')

const ingestLog = async (req, res) => {
    console.log(`Server hit: ${res.get('X-Server-Id')}`)
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

const searchLogs = async (req, res) => {
    console.log(`Server hit: ${res.get('X-Server-Id')}`)
    // Validate JSON format
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { query, filters, page = 1, pageSize = 10 } = req.body;
    try {
        const mustClauses = [
            {
                match: {
                    message: {
                        query,
                        fuzziness: 'auto', // Enables fuzzy matching
                    },
                },
            }, // Full-text search on the 'message' field

            // Dynamically add more must clauses for additional filters
            ...Object.keys(filters).map((field) => ({
                match: { [field]: filters[field] },
            })),
        ];

        console.log(mustClauses);

        const response = await esClient.search({
            index: process.env.ELASTICSEARCH_INDEX || 'logs',
            body: {
                query: {
                    bool: {
                        must: mustClauses,
                        filter: [
                            // Date range filter
                            filters.startDate && filters.endDate
                                ? {
                                    range: {
                                        timestamp: {
                                            gte: filters.startDate,
                                            lte: filters.endDate,
                                        },
                                    },
                                }
                                : null,
                        ].filter(Boolean), // Remove null values from the array
                    },
                },
                sort: [{ timestamp: { order: 'desc' } }], // Sort by timestamp in descending order
                from: (page - 1) * pageSize, // Calculate the starting index based on the page and pageSize
                size: pageSize, // Maximum number of results to return per page
            },
        });

        const hits = response.hits.hits;
        const totalHits = response.hits.total.value; // Total number of hits
        const totalPages = Math.ceil(totalHits / pageSize); // Calculate total pages

        res.json({
            success: true,
            data: hits.map((hit) => hit._source),
            pagination: {
                page,
                pageSize,
                totalHits,
                totalPages,
            },
        });
    } catch (error) {
        console.error('Error executing search:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

module.exports = {
    ingestLog,
    searchLogs
}