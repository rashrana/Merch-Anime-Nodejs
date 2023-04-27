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
        console.log(data);
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(data);
    } finally {
        await client.close();
    }
    
} 

module.exports = {
    getMerchandise
}