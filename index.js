const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/prod')(app);


const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening to PORT ${port}`));

module.exports = server;