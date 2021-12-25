const http = require('http');

const server = http.

((req, res) => {
	//console.log(req);

	if (req.url === '/ok') {
		const str = 'ok';

		res.writeHead(200, {
			'Content-Type': 'application/json',
			'Content-Length': str.length
		});

		res.end(str);
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end();
	}
});

server.listen(8000);