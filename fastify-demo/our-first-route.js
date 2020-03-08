const opts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        someKey: { type: 'string' },
        someOtherKey: { type: 'number' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}


async function routes (fastify, options) {
  const database = fastify.mongo.db('test')
  const collection = database.collection('kittens')

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.get('/search/:name', async (request, reply) => {
    const result = await collection.findOne({ name: request.params.name })
    console.log(result)
    if (result.name === null) {
      throw new Error('Invalid value')
    }
    return result.name
  })

  fastify.post('/save', opts, async (request, reply) => {
    return { hello: 'world' }
  })
}

module.exports = routes