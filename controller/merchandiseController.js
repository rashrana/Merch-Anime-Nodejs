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
    } catch(e) {
        await console.error(e);
    } finally {
        await client.close();
    }
    
} 

async function getOrders(req, res) {
    try {
        await client.connect();
        const cursor = await client.db('MerchAnime').collection('orders').find({});
        const result = await cursor.toArray();
        const data = JSON.stringify(result);
        const headers = {
            'Access-Control-Allow-Origin': '*', 
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
            'Content-Type': 'application/json'
          };
        res.writeHead(200,headers);
        res.end(data);
    } catch(e) {
        await console.error(e);
    } finally {
        await client.close();
    }
    
}

async function placeOrder(req, res, data) {
    try {
        await client.connect();
        
        const cursor = await client.db('MerchAnime').collection('orders').insertOne(data);
        console.log(cursor);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify({response: "Successfully inserted!"}));
    } catch(e) {
        await console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = {
    getMerchandise,
    placeOrder,
    getOrders
}