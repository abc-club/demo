import m = require('mod');
export let t = m.something + 1;

import url = require('url');
url.parse('http://baidu.com');
url.parse2('http://baidu.com');
url.format(url.parse('http://baidu.com'));
