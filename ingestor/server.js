const express = require('express');
const bodyParser = require('body-parser');
const logRoutes = require('./routes/logRoutes');
const setServerId = require('./middleware/serverIdMiddleware');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

const os = require('os');
const containerId = os.hostname();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to ser server ID - just to verify load balancer is working
app.use(setServerId)

// Use the logRoutes for '/log' endpoint
app.use('/log', logRoutes);

app.get('/', (req, res) => {
    res.send(`Hello from API running on server ${res.get('X-Server-Id')}!`);
});


// Start the server
app.listen(port, () => {
    console.log(`Log ingestor listening at http://localhost:${port}`);
});
