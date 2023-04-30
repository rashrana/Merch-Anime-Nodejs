
const { getMerchandise, placeOrder, getOrders } = require('./controller/merchandiseController');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res)=> {
    console.log(req.url);
    
    
    if(req.url === '/') {

        fs.readFile(path.join(__dirname, 'portfolio','index.html'),
        (err, content) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(content);
        })
        // res.writeHead(200,{'Content-Type':'text/html'});
        // res.write("This is your portfolio page.");
    }
    else if (req.url === '/about.html') {
        fs.readFile(path.join(__dirname, 'public','about.html'),
        (err, content) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(content);
        })
    }else if (req.url === '/style.css') {
        fs.readFile(path.join(__dirname, 'portfolio','style.css'),
        (err, content) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type':'text/css'});
            res.end(content);
        })
    }
    else if(req.url === '/api') {
        getMerchandise(req,res);

    } else if(req.url === '/getOrder') {
        getOrders(req,res);
    }
    else if (req.method === 'OPTIONS') {
        // Handle preflight request
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.writeHead(200);
        res.end();
    }
    else if(req.url === '/placeOrder' && req.method == 'POST') {
        
        console.log("hello my friend");
        const chunks = [];
        req.on('data', chunk => chunks.push(chunk));
        req.on('end', () => {
        const data = Buffer.concat(chunks);
        const body = JSON.parse(new Buffer.from(data).toString());
        console.log(body)
        placeOrder(req,res, body);
        
        })
    }
    else {
        res.writeHead(404, {'Content-Type':'text/html'})
        res.write("<h1>404 Nothing is here</h1>");
    }
    // res.end();
});

server.listen(5958, () => console.log("great our server is running"));
