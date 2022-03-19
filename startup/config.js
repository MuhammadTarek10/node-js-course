const config = require('config');

module.exports = function(){
    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: JWT is not Defined');
    }
    else{
        console.log(`Top Secret JWT: [${config.get('jwtPrivateKey')}]`)
    }
}