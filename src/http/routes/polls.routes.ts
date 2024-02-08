// routes.ts

import { FastifyInstance } from 'fastify'
import { createPolls } from './polls/create-polls.routes'
import { getPolls } from './polls/get-polls.routes'
import { voteOnPolls } from './polls/vote-poll.routes'

export function registerPollsRoutes(app: FastifyInstance) {
  app.register(createPolls)
  app.register(getPolls)
  app.register(voteOnPolls)
}
