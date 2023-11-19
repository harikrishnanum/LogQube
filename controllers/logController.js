const { validationResult } = require('express-validator');

const ingestLog = (req, res) => {
    // Validate JSON format
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const logData = req.body;
    console.log(logData);
    // TODO: Implement log ingestion logic (e.g., store in a database)

    console.log('Received log:', logData);
    res.status(200).send('Log received successfully');
};

module.exports = {
    ingestLog
}