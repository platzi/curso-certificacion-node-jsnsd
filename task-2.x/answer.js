'use strict'

const fastify = require('fastify')({
  logger: true
})

const users = {
  admin: {
    password: 'admin',
    role: '67890'
  }
}

function searchUser (user) {
  if (!user || !users[user]) return null

  return users[user]
}

fastify.get('/users', (request, reply) => {
  const { username } = request.query

  if (!username) return reply.code(400).send({ error: 'Bad Request' })

  if (Object.keys(request.query).length > 1) {
    return reply.code(406).send({ error: 'Not Acceptable' })
  }

  const user = searchUser(username)
  if (!user) {
    reply.code(500).send({ error: 'User error' })
    return
  }

  reply.send({ username, result: user })
})

fastify.listen({ port: process.env.PORT || 3000 }, (err) => {
  if (err) throw err

  fastify.log.info(`server listening on ${fastify.server.address().port}`)
} )
