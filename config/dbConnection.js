const mongo = require('mongodb');
const env = require('../.env.local');


const dbConnection = () => {
    ;
    return new mongo.MongoClient(env, // hostAddr
        {useNewUrlParser: true, useUnifiedTopology: true}
    );    
} 
    

module.exports = () => dbConnection;
