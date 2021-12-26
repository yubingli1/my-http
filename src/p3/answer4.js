const database = require('./database');
const http = require('http');

const routingtable = {
    '/phone': function getAllPhoneList(findUrl) {
        const keyword = findUrl.get('kw');
        
        function filter() {
            const result = [];
            
            for(let arr of database.phone) {
                if(arr.includes(keyword)) {
                    result.push(arr);
                }
            }
            return result;
        }

        if(keyword !== null){
            return filter;
        } else {
            return database.phone;
        }
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

function route(indexUrl) {
    if(indexUrl in routingtable) {
        return routingtable[indexUrl];
    } else {
        return getEmpty;
    }
}

const server = http.createServer();

server.on('request', function(req, res) {
    if(req.url !== '/favicon.ico') {
        const myURL = new URL(req.url, `http://${req.headers.host}`);
        const indexUrl = myURL.pathname;
        const findUrl = myURL.searchParams;
        const result = route(indexUrl)(findUrl)();

        res.writeHead(200, {
            "Content-Type": 'application/json'
        });

        res.end(JSON.stringify(result));
    }
});

server.listen(8000);