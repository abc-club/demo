'use strict';

const Controller = require('egg').Controller;

class Home extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello';
  }
  async isIOS() {
    const { ctx } = this;
    ctx.body = 'isIOS:' + ctx.isIOS;
  }
}

module.exports = Home;
