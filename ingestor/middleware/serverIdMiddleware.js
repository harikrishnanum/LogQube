const os = require('os');

const setServerIdentifier = (req, res, next) => {
    const serverId = os.hostname();
    res.header('X-Server-Id', serverId);
    next();
};

module.exports = setServerIdentifier
