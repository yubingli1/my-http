const database = require('./database');
const http = require('http');

const routingtable = {
    '/phone': function getAllPhoneList(keyword) {
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
        const indexUrl = myURL.pathname;
        //const keyObject = Object.fromEntries(myURL.searchParams.entries());
        //const key = Object.keys(keyObject).toString();
        const keyword = myURL.searchParams.get('kw');
        const result = route(req.url, indexUrl)(keyword)();


        res.writeHead(200, {
            "Content-Type": 'application/json'
        });

        res.end(JSON.stringify(result));
    }
});

server.listen(8000);