const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3003;

const server = http.createServer((req, res) => {
    console.log(`Request URL: ${req.url}`);

    let filePath = '';
    let contentType = 'text/html';
    let statusCode = 200;

    switch (req.url) {
        case '/':
            filePath = 'index.html'; 
            break;
        case '/about':
            filePath = 'about.html'; 
            break;
        case '/contact':
            filePath = 'contact.html'; 
            break;
        default:
            filePath = 'nopage.html';
            statusCode = 404;
            break;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", 'text/plain');
            res.end("500 Internal Server Error");
        } else {
            res.statusCode = statusCode;
            res.setHeader("Content-Type", contentType);
            res.end(data);
        }
    });
});

server.listen(PORT, (err) => {
    if (err) {
        console.error(`Error starting server: ${err}`);
    } else {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});
