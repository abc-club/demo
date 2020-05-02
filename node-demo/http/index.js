const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
  fs.readFile('./index.html', (err, data) => {
    console.log(data);
    res.end(data);
  });
});

server.listen(3001);
