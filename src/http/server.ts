import fastify from 'fastify'
import { registerPollsRoutes } from './routes/polls.routes'

const app = fastify()

registerPollsRoutes(app)

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`http server is running on ${address}`)
  console.log(`http server is running on ${address}`)

})