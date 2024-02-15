const http = require('http');
const fs = require('fs');
const url = require('url');

let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

const server = http.createServer((req, res) => {
     const { pathname, query } = url.parse(req.url, true);
    // let x = url.parse(req.url, true);
    // console.log(x);

    if (pathname === '/' && req.method === 'GET') {
        let filteredProducts = products;

        if (query.category) {
            filteredProducts = products.filter(product => product.category === query.category);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(filteredProducts));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3001, () => {
    console.log('Server started...');
});

server.on('error', (err) => {
    console.log('Unable to start server', err);
});