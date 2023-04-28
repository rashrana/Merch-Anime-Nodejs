
const { getMerchandise } = require('./controller/merchandiseController');
const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const server = http.createServer((req, res)=> {
    console.log(req.url);
    res.setHeader("Access-Control-Allow-Origin", "*");
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
        // res.writeHead(200, {'Content-Type':'application/json'});
        // res.end("{your:data}")

        // fs.readFile(path.join(__dirname, 'public','db.json'),
        // (err, content) => {
        //     if (err) throw err;
        //     res.writeHead(200, {'Content-Type':'application/json'});
        //     res.end(content);
        // })

        // const result = await run().catch(console.dir);
        getMerchandise(req,res);

    }
    else {
        res.writeHead(404, {'Content-Type':'text/html'})
        res.write("<h1>404 Nothing is here</h1>");
    }
    // res.end();
});

server.listen(5958, () => console.log("great our server is running"));
