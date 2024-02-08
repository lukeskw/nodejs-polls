import { FastifyInstance } from 'fastify'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { prisma } from '../../../lib/prisma';

export const polls = async (app: FastifyInstance) => {

  app.post('/polls', async (request, reply) => {

    const createPollBody = z.object({
      title: z.string().min(5)
    })

    try {
      const { title } = createPollBody.parse(request.body)

      const poll = await prisma.poll.create({
        data: {
          title,
        }
      })

      return reply.status(201).send({ "pollId": poll.id})

    } catch( err ){
      if(err instanceof ZodError){
        const validationError = fromZodError(err);
        console.error('Error parsing request body:', validationError.message);
        return reply.status(400).send({ error: validationError.message });
      }
    }
  });

};