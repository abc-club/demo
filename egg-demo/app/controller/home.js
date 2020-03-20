'use strict';

const Controller = require('egg').Controller;

class Home extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello';
  }
}

module.exports = Home;
