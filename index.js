const http = require('http');
var dateNow = new Date();

const server = http.createServer((req, res) => {
    const str = JSON.stringify({
        data: 'Hello World!',
        year: dateNow.getFullYear(),
        month: dateNow.getMonth(),
        date: dateNow.getDate()
    });

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Content-Length': str.length
    });

    res.end(str);
});

server.listen(8000);