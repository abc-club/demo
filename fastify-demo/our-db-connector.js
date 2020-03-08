const fastifyPlugin = require('fastify-plugin')
const MongoClient = require('mongodb').MongoClient

async function dbConnector (fastify, options) {
  const url = options.url
  delete options.url

  const db = await MongoClient.connect(url, options)
  fastify.decorate('mongo', db)
}
// 用 fastify-plugin 包装插件，以使插件中声明的装饰器、钩子函数及中间件暴露在根作用域里。
module.exports = fastifyPlugin(dbConnector)