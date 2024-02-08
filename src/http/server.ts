import fastify from 'fastify'

const app = fastify()

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`http server is running on ${address}`)
  console.log(`http server is running on ${address}`)

})