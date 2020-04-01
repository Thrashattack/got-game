const mongo = require('mongodb');
const env = require('../.env.local');


module.exports = () => {
    console.warn("Conectando ao banco de dados");
    try {        
        return new mongo.MongoClient(env, // hostAddr
            {useNewUrlParser: true, useUnifiedTopology: true}
        );    
    } catch (e) {
        console.error(e);
    }
}; 
