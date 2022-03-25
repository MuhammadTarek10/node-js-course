const config = require('config');

module.exports = function(){
    if(!config.get('jwtPrivateKey') && !process.env.jwtPrivateKey){
        throw new Error('FATAL ERROR: JWT is not Defined');
    }
    else{
        const jwtPrivateKey =config.get('jwtPrivateKey')|| process.env.jwtPrivateKey;
        console.log(`Top Secret JWT: [${jwtPrivateKey}]`);
    }
}