const http2 = require('http2');
const fs = require('fs');
const client = http2.connect('https://localhost:8443', {
  ca: fs.readFileSync('证书.pem'),
});
client.on('error', (err) => console.error(err));

const req = client.request({ ':path': '/' });

req.on('response', (headers, flags) => {
  for (const name in headers) {
    console.log(`${name}: ${headers[name]}`);
  }
});

req.setEncoding('utf8');
let data = '';
req.on('data', (chunk) => {
  data += chunk;
});
req.on('end', () => {
  // console.log(`\n${data}`);
  console.log(`成功`);
  client.close();
});
req.end();

client.on('stream', (pushedStream, requestHeaders) => {
  pushedStream.on('push', (responseHeaders) => {
    // Process response headers
    console.log('push', responseHeaders);
  });
  pushedStream.on('data', (chunk) => {
    /* handle pushed data */
    console.log('data', chunk.toString());
  });
});
