const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = process.env.MONGO_URI;
console.log(uri);

const client = new MongoClient(uri, {
 serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true 
 }
});

const database = client.db("hck-68")

module.exports = {database, client};