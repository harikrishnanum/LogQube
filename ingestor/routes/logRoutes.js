const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const logController = require('../controllers/logController');

// Validation rules for log data
const ingestValidation = [
    body('level').optional().isString(),
    body('message').isString(),
    body('resourceId').optional().isString(),
    body('timestamp').optional().isISO8601(),
    body('traceId').optional().isString(),
    body('spanId').optional().isString(),
    body('commit').optional().isString(),
    body('metadata.optional().parentResourceId').optional().isString(),
];

// Endpoint to receive logs via HTTP POST
router.post('/ingest', ingestValidation, logController.ingestLog);


// Validation schema for the filters
const searchValidation = [
    body('query').optional().isString(),
    body('filters.level').optional().isString(),
    body('filters.message').optional().isString(),
    body('filters.resourceId').optional().isString(),
    body('filters.timestamp').optional().isISO8601().toDate(),
    body('filters.traceId').optional().isString(),
    body('filters.spanId').optional().isString(),
    body('filters.commit').optional().isString(),
    body('filters.metadata.parentResourceId').optional().isString(),
];

router.post('/search', searchValidation, logController.searchLogs)

module.exports = router;
