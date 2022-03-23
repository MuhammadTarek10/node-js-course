const express = require('express');
const winston = require('winston');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging');
require('./startup/config')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening to PORT ${port}`));