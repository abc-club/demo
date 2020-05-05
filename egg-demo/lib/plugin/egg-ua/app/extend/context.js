'use strict';
module.exports = {
  get isIOS() {
    console.log('111');
    const iosReg = /iphone|ipad|ipod/i;
    return iosReg.test(this.get('user-agent'));
  },
};
