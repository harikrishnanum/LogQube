const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

// Endpoint to receive logs via HTTP POST
router.post('/ingest', logController.ingestLog);

module.exports = router;
