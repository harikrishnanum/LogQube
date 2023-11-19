const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const logController = require('../controllers/logController');

// Validation rules for log data
const logValidationRules = [
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
router.post('/ingest', logValidationRules, logController.ingestLog);

module.exports = router;
