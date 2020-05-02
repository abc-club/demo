// 生成证书：openssl req -x509 -nodes -days 730 -newkey rsa:2048 -keyout cert.key -out cert.pem -config req.cnf -sha256

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./cert.key'),
  cert: fs.readFileSync('./cert.pem'),
};

var server = https.createServer(options, (req, res) => {
  res.end('hello');
});
server.listen(8000);
