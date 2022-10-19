'use strict'

import Fastify from 'fastify'
const { PORT } = process.env

const fastify = Fastify({
  logger: true
})

await fastify.register(import('@fastify/rate-limit'), {
  max: 3,
  timeWindow: 15000,
  errorResponseBuilder: (req, context) => {
    return {
      statusCode: 429,
      error: 'Too Many Requests'
    }
  }
})
function login (user, passwd) {
  return user === 'node' && passwd === 'developer'
}

fastify.post('/login', async (request, reply) => {
  const { username, password } = request.body
  const validuser = login(username, password)

  if (!validuser) return reply.code(401).send({ error: 'Unauthorized' })

  reply.send({})
})

fastify.listen({ port: PORT || 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
