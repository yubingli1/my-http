const database = require("./database");
const http = require('http');

function getAllPhoneList() {
        return database.phone;
    };

function getEmpty() {
    return null;
}

function route(url) {
    if(url === '/phone?kw=a') {
        return getAllPhoneList;
    } else {
        return getEmpty;
    }
}

const server = http.createServer((req, res) => {
    //const myURL = new URL('https://localhost:8000/phone?kw=a');
    const myURL = new URL(req.url, `http://${req.headers.host}`);
    const keyword = (myURL.searchParams.get('kw'));
    const result = route(req.url)()?.filter(arr => arr.includes(keyword));

    res.writeHead(200, {
        "Content-Type": 'application/json'
    });

    res.end(JSON.stringify(result));
});

server.listen(8000);