import fastify from 'fastify'
import { registerPollsRoutes } from './polls.routes'
import fastifyCookie from '@fastify/cookie'
import fastifyWebsocket from '@fastify/websocket'

const app = fastify()

app.register(fastifyCookie, {
  secret: crypto.randomUUID(),
  hook: 'onRequest',
  parseOptions: {}
})

app.register(fastifyWebsocket)

registerPollsRoutes(app)

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`http server is running on ${address}`)
  console.log(`http server is running on ${address}`)

})