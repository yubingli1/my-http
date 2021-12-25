const database = require('./database');
const http = require('http');

//因为这里不做直接输出，所以返回函数调用，即调用完查询器必须执行过滤器
const routingtable = {
    '/phone': function getAllPhoneList(url, keyword) {
        return Filter(database.phone, url, keyword);
    },
    '/laptop': function getAllLaptopList(url, keyword) {
        return Filter(database.laptop, url, keyword);
    },
    '/router': function getAllRouterList(url, keyword) {
        return Filter(database.router, url, keyword);
    }
};

function getEmpty() {
    return null;
}

function getFilteredList(source, keyword) {
    return source.filter(arr => arr.includes(keyword));
}


//这里的筛选器使用也直接使用函数调用，即一旦需要发生过滤，必须使用筛选器
function Filter(source, url, keyword) {
    if(url.includes('?kw=')) {
        return getFilteredList(source, keyword);
    } else {
        return source;
    }
}

//路由器使用选择器
//使用indexUrl索引避免了使用/phone?等不完整语句带来的错误
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
        const result = route(req.url, indexUrl)(req.url, keyword);

        res.writeHead(200, {
            "Content-Type": 'application/json'
        });

        res.end(JSON.stringify(result));
    }
});

server.listen(8000);