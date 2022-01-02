setTimeout(() => console.log('fuck'), 5000);

const ID = setInterval(() => console.log('hello world'), 3000);

setTimeout(() => {
    clearInterval(ID);
}, 20000);