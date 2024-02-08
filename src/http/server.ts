import fastify from 'fastify'
import { polls } from './routes/polls/polls.routes'

const app = fastify()

app.register(polls)

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`http server is running on ${address}`)
  console.log(`http server is running on ${address}`)

})