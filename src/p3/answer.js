const database = require('./database');
const http = require('http');

const routingtable = {
    '/phone': function getAllPhoneList() {
        return database.phone;
    },
    '/laptop': function getAllLaptopList() {
        return database.laptop;
    },
    '/router': function getAllRouterList() {
        return database.router;
    }
};

function getEmpty() {
    return null;
}

function getFilteredPhoneList(keyword) {
    const value = database.phone;
    return value.filter(arr => arr.includes(keyword));
}

function route(url) {
    if(url.includes('?kw=')) {
        return getFilteredPhoneList;
    } else if(url in routingtable) {
        return routingtable[url];
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