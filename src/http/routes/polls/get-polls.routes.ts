import { FastifyInstance } from 'fastify'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { prisma } from '../../../lib/prisma';
import { redis } from '../../../lib/redis';

export const getPolls = async (app: FastifyInstance) => {

  app.get('/polls/:pollId', async (request, reply) => {

    const createPollParam = z.object({
      pollId: z.string().uuid(),
    })

    try {
      const { pollId } = createPollParam.parse(request.params)

      const poll = await prisma.poll.findUnique({
        where: {
          id: pollId
        },
        include: {
          options: {
            select: {
              id: true,
              title: true
            }
          }
        }
      })

      if(!poll){
        return reply.status(404).send({ error: 'Poll not found' });
      }

      const result = await redis.zrange(pollId, 0, -1, 'WITHSCORES')

      const redisVotes = result.reduce(( prevValue, currValue, currIdx  ) => {
        if(currIdx % 2 === 0){
          const score = result[currIdx + 1]

          Object.assign( prevValue, { [currValue]: Number(score) })
        }
        return prevValue
      }, {} as Record<string, number>)

      return reply.status(200).send({
        poll: {
          id: poll.id,
          title: poll.title,
          options: poll.options.map( option => {
            return {
              id: option.id,
              title: option.title,
              score: (option.id in redisVotes) ? redisVotes[option.id] : 0
            }
          })
        }
      })

    } catch( err ){
      if(err instanceof ZodError){
        const validationError = fromZodError(err);
        console.error('Error parsing request:', validationError.message);
        return reply.status(400).send({ error: validationError.message });
      }
      console.error(String(err))
      throw new Error(String(err))
    }
  });

};