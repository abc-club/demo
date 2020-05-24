// 生成证书：openssl req -x509 -nodes -days 730 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./cert.key'),
  cert: fs.readFileSync('./cert.pem'),
};

var server = https.createServer(options, (req, res) => {
  // res.end('hello');
  res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
  fs.readFile('./index.html', (err, data) => {
    console.log(data);
    res.end(data);
  });
});
server.listen(8000);
