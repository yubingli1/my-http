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

function getFilteredPhoneList(indexUrl, keyword) {
    const value = routingtable[indexUrl];
    return value().filter(arr => arr.includes(keyword));
}

function Filter(url){
    if(url.includes('?kw=')) {
        return getFilteredPhoneList;
    } else {
        return routingtable[url];
    }
}

function route(url) {
    for(let key in routingtable){
        if(url.includes(key)) {
            return Filter;
        }
    }
    return getEmpty;
}

const server = http.createServer();

server.on('request', function(req, res) {
    if(req.url !== '/favicon.ico') {
        const myURL = new URL(req.url, `http://${req.headers.host}`);
        const keyword = myURL.searchParams.get('kw');
        const indexLength = req.url.length - myURL.search.length;
        const indexUrl = req.url.slice(0, indexLength);
        const result = route(req.url)(req.url)(indexUrl, keyword);

        res.writeHead(200, {
            "Content-Type": 'application/json'
        });

        res.end(JSON.stringify(result));
    }
});

server.listen(8000);