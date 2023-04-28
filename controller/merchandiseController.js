const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rana:prashant@merchandise.bbx8vyj.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function getMerchandise(req, res) {
    try {
        await client.connect();
        const cursor = await client.db('MerchAnime').collection('merchandise').find({});
        const result = await cursor.toArray();
        const data = JSON.stringify(result);
        const headers = {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
            'Content-Type': 'application/json'
          };
        res.writeHead(200,headers);
        res.end(data);
    } finally {
        await client.close();
    }
    
} 

module.exports = {
    getMerchandise
}