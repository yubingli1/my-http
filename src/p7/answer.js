/* setTimeout(() => clearTimeout(ID), 20000);

const ID = setTimeout(() => console.log('hello world'), 3000);

const ID2 = setTimeout(function() {
    setTimeout(() => console.log('hello world'), 3000);
}, 0) */

/* const generater = setTimeout(function() {
    setTimeout(() => {
        console.log('hello world');
        //let ID = setTimeout(() => console.log('hello world'), 3000);
        
    })
}, 3000)

setTimeout(() => clearTimeout(generater), 20000); */

let ID = [];
setTimeout(() => clearTimeout(ID), 20000);

(function generater() {
    ID = setTimeout(function() {
        console.log('hello world');
        generater();
    }, 3000)
}())