const winston = require('winston');
require('express-async-errors');


module.exports = function(){
    winston.add(new winston.transports.File({filename: 'logfile.log'}));
    winston.ExceptionHandler(new winston.transports.File({filename: 'uncaughtExpections.log'}));
    winston.RejectionHandler(new winston.transports.File({filename: 'uncaughtRejections.log'}));
}