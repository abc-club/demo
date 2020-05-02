const tls = require('tls');
const https = require('https');
const crypto = require('crypto');

function sha256(s) {
  return crypto.createHash('sha256').update(s).digest('base64');
}
const options = {
  hostname: 'github.com',
  port: 443,
  path: '/',
  method: 'GET',
  checkServerIdentity: function (host, cert) {
    // 确保将证书颁发给所连接的主机。
    const err = tls.checkServerIdentity(host, cert);
    if (err) {
      return err;
    }
    console.log(cert);
    // // 固定公钥，类似于固定的 HPKP pin-sha25。
    // const pubkey256 = 'pL1+qb9HTMRZJmuC/bB/ZI9d302BYrrqiVuRyW+DGrU=';
    // if (sha256(cert.pubkey) !== pubkey256) {
    //   const msg = '证书验证错误: ' + `'${cert.subject.CN}' 的公钥` + '与固定的指纹不符';
    //   return new Error(msg);
    // }

    // // 固定确切的证书，而不是公钥。
    // const cert256 = '25:FE:39:32:D9:63:8C:8A:FC:A1:9A:29:87:' + 'D8:3E:4C:1D:98:DB:71:E4:1A:48:03:98:EA:22:6A:BD:8B:93:16';
    // if (cert.fingerprint256 !== cert256) {
    //   const msg = '证书验证错误: ' + `'${cert.subject.CN}' 的证书` + '与固定的指纹不符';
    //   return new Error(msg);
    // }

    // 此循环仅供参考。
    // 打印链条中所有证书的证书与公钥指纹。
    // 通常，将发行人的公钥固定在公共互联网上，同时将服务的公钥固定在私密的环境中。
    do {
      console.log('主体的常用名称:', cert.subject.CN);
      console.log('  证书的 SHA256 指纹:', cert.fingerprint256);

      hash = crypto.createHash('sha256');
      console.log('  公钥的 ping-sha256:', sha256(cert.pubkey));

      lastprint256 = cert.fingerprint256;
      cert = cert.issuerCertificate;
    } while (cert.fingerprint256 !== lastprint256);
  },
};

options.agent = new https.Agent(options);
const req = https.request(options, (res) => {
  console.log('一切正常。服务器与固定的证书或公钥相匹配。');
  console.log('状态码:', res.statusCode);
  // 打印 HPKP 的值。
  console.log('请求头:', res.headers['public-key-pins']);

  res.on('data', (d) => {});
});

req.on('error', (e) => {
  console.error(e.message);
});
req.end();
