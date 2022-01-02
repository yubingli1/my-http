/* const http = require('http');
const database = require('./database');
const EXAMPLE_ORIGIN = 'http://example.com';

const routingTable = {
    '/phone'(searchParams) {
        const keyword = searchParams.get('kw');
        const finalKeyword = keyword === null ? '' : keyword;

        return database.phone
        .filter(modelName => modelName.includes(finalKeyword));
    },
    '/laptop'(searchParams) {

    },
    '/router'(searchParams) {

    }
}

function notFound() {
    return null;
}

function router(pathname) {
    return pathname in routingTable ? routingTable[pathname] : notFound;
}

http.createServer((req,res) => {
    const url = new URL(req.url, EXAMPLE_ORIGIN);
    const selector = router(url.pathname);

    res.setHeader('Content-Type', 'application/json');

    if(selector === notFound) {
        res.statusCode = 404;
        return res.end();
    }

    const result = selector(url.searchParams);
    const responseBody = JSON.stringify(result);
    res.statusCode = 200;
    res.end(responseBody);
}).listen(8000);
 */

/* const promise = new Promise(function(resolve, reject) {
    console.log('promise');
    resolve();
}).then(function() {
    console.log('Resolved');
})

console.log('Hi'); */

/* const p1 = new Promise((resolve, reject) => {
    //setTimeout(() => reject(new Error('fail')), 3000);
    setTimeout(() => resolve(1), 3000);
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(p1), 1000);
})

p2
.then(result => console.log(result))
.catch(error => console.log(error)); */

/* const p = new Promise((resolve, reject) => {
    return resolve(1);
    console.log(2);
}).then(result => {
    console.log(result);
}) */

/* const promise = new Promise((resolve, reject) => {
    //throw new Error('test');
    return reject(new Error('test'));
}).catch(error => console.log(error)); */

/* const promise = new Promise((resolve, reject) => {
    //throw new Error('test');
    resolve(2);
    return reject(new Error('test'));
}).catch(error => console.log(error)); */

/* const p1 = new Promise((resolve, reject) => {
    resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e)); */

/* const p1 = new Promise((resolve, reject) => {
    resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
})
.then(result => result)

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e)); */

/* setTimeout(() => {
    console.log('three');
}, 0);

Promise.resolve().then(() => {
    console.log('two');
});

console.log('one'); */

/* const ab = Promise.resolve(Promise.reject())
.then(r => r)
.catch(e => e);

const abc = Promise.reject(Promise.resolve())
.then(r => r)
.catch(e => e); */

/* const b = Promise.resolve(); */

/* const abc = Promise.resolve(Promise.reject('出错了'))
.then(r => console.log(r))
.catch(e => console.log(e));

setTimeout(() => console.log('s'));

const b = Promise.reject()
.then(r => console.log(r))
.catch(e => console.log(e));

const c = new Promise((resolve, reject) => {
    resolve(1);
})
.then(r => console.log(r))
.catch(e => console.log(e));

const a = 1; */