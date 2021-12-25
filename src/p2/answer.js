const database = require("./database");
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

function route(url) {
    if(url in routingtable) {
        return routingtable[url];
    } else {
        return getEmpty;
    }
}

const server = http.createServer((req, res) => {
    const result = route(req.url);
})