const winston = require('winston');
require('express-async-errors');


module.exports = function(){
    winston.add(new winston.transports.File({filename: 'logfile.log'}));
    // winston.exceptions.handle(new winston.transports.File({filename: 'exceptions.log'}));
    // winston.rejections.handle(new winston.transports.File({filename: 'rejections.log'}));
}