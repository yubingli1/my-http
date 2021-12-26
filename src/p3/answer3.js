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

function getFilteredList(result, keyword) {
    return result.filter(arr => arr.includes(keyword));
}

function Filter(url, result) {
    if(url.includes('?kw=')) {
        return getFilteredList;
    } else {
        return result;
    }
}

function route(url, indexUrl) {
    for(let key in routingtable){
        if(url.includes(key)) {
            return routingtable[indexUrl];
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
        const result = route(req.url, indexUrl)();
        const filteredResult = Filter(req.url, result)(result, keyword);
        //const filteredResult = Filter(req.url, route(req.url, indexUrl)())
        //(route(req.url, indexUrl)(), keyword);

        res.writeHead(200, {
            "Content-Type": 'application/json'
        });

        res.end(JSON.stringify(filteredResult));
    }
});

server.listen(8000);