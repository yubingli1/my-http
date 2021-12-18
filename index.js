const http = require('http');

const server = http.createServer((req, res) => {
    const str = JSON.stringify({
        data: 'Hello World!'
    });

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': str.length
    });

    res.end(str);
});

server.listen(8000);