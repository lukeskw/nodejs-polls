// routes.ts

import { FastifyInstance } from 'fastify'
import { createPolls } from './http/routes/polls/create-polls.routes'
import { getPolls } from './http/routes/polls/get-polls.routes'
import { voteOnPolls } from './http/routes/polls/vote-poll.routes'
import { pollResultsWs } from './ws/routes/polls/poll-results'

export function registerPollsRoutes(app: FastifyInstance) {
  app.register(createPolls)
  app.register(getPolls)
  app.register(voteOnPolls)
  app.register(pollResultsWs)
}
