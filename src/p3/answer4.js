const database = require('./database');
const http = require('http');

const routingtable = {
    '/phone': function getAllPhoneList(findUrl) {
        const keyword = findUrl.get('kw');

        if(keyword !== null) {
            const result = [];
        
            for(const str of database.phone) {
                if(str.includes(keyword)) {
                    result.push(str);
                }
            }

            return result;
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

const server = http.createServer((req, res) => {
    const myURL = new URL(req.url, `http://${req.headers.host}`);
    const indexUrl = myURL.pathname;
    const findUrl = myURL.searchParams;
    const Queryer = route(indexUrl);

    if(Queryer === getEmpty) {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        
        res.end();
    } else {
        const result = Queryer(findUrl);

        res.writeHead(200, {
            "Content-Type": 'application/json'
        });

        res.end(JSON.stringify(result));
    }
});

server.listen(8000);