const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb+srv://mongo:mongo@test-cluster.j08xo.mongodb.net/playground')
    .then(() => console.log('connected to mongodb'));
}