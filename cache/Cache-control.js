const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

http
  .createServer((req, res) => {
    let { pathname } = url.parse(req.url, true);
    console.log(pathname);
    let abs = path.join(__dirname, pathname);
    // res.setHeader('Cache-Control', 'no-store'); // 浏览器会发两次请求
    res.setHeader('Cache-Control', 'no-cache'); // 浏览器只会发一次请求
    // res.setHeader('Cache-Control', 'max-age=20');
    fs.stat(path.join(__dirname, pathname), (err, stat) => {
      if (err) {
        res.statusCode = 404;
        res.end('not found');
        return;
      }
      if (stat.isFile()) {
        fs.createReadStream(abs).pipe(res);
      }
    });
  })
  .listen(3001);
