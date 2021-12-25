const database = require('./database');
const http = require('http');

function getEmpty() {
    return null;
}

function getFilteredPhoneList(keyword) {
    const value = database.phone;
    return value.filter(arr => arr.includes(keyword));
}

function route(url) {
    if(url.includes('/phone?kw=')) {
        return getFilteredPhoneList;
    } else {
        return getEmpty;
    }
}

const server = http.createServer();

server.on('request', function(req, res) {
    if(req.url !== '/favicon.ico') {
        const myURL = new URL(req.url, `http://${req.headers.host}`);
        const keyword = myURL.searchParams.get('kw');
        const result = route(req.url)(keyword);

        res.writeHead(200, {
            "Content-Type": 'application/json'
        });

        res.end(JSON.stringify(result));
    }
});

server.listen(8000);