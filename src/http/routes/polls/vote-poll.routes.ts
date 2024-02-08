import { FastifyInstance } from 'fastify'
import { FastifyReply } from 'fastify/types/reply';
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { prisma } from '../../../lib/prisma';
import { redis } from '../../../lib/redis';

export const voteOnPolls = async (app: FastifyInstance) => {

  app.post('/polls/:pollId/votes', async (request, reply) => {

    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    })

    const voteOnPollParam = z.object({
      pollId: z.string().uuid(),
    })

    try {
      const { pollId } = voteOnPollParam.parse(request.params)
      const { pollOptionId } = voteOnPollBody.parse(request.body)

      let { userId } = request.cookies

      if(userId) {
        const didUserVotedPreviouslyOnPoll = await prisma.vote.findUnique({
          where: {
            userId_pollId: {
              userId,
              pollId
            }
          }
        })

        if(didUserVotedPreviouslyOnPoll && didUserVotedPreviouslyOnPoll.pollOptionId !== pollOptionId){
          try{
            await prisma.vote.delete({
              where: {
                id: didUserVotedPreviouslyOnPoll.id
              }
            })

            await redis.zincrby(pollId, -1, didUserVotedPreviouslyOnPoll.pollOptionId)

          } catch(err){
            return reply.status(500).send({ error: 'An error has occured while deleting your previous vote. Try again later' })
          }
        }

        if (didUserVotedPreviouslyOnPoll && didUserVotedPreviouslyOnPoll.pollOptionId === pollOptionId){
          return reply.status(400).send({ error: 'You already voted on this poll!' })
        }
      }

      if(!userId){
        userId = setUserCookies(reply)
      }

      const vote = await prisma.vote.create({
        data: {
          userId,
          pollId,
          pollOptionId
        }
      })

      await redis.zincrby(pollId, 1, pollOptionId)

      if(!vote){
        return reply.status(400).send({ error: 'Poll not created' })
      }

      return reply.status(201).send({ vote })

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

  function setUserCookies(reply: FastifyReply){
    let userId = crypto.randomUUID()

    reply.setCookie('userId', userId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      signed: true,
      httpOnly: true,
    })

    return userId
  }

};