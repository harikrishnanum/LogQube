const express = require('express');
const bodyParser = require('body-parser');
const logRoutes = require('./routes/logRoutes');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the logRoutes for '/log' endpoint
app.use('/log', logRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Log Ingestor and Query Interface!');
});

// Start the server
app.listen(port, () => {
    console.log(`Log ingestor listening at http://localhost:${port}`);
});
