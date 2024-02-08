import { FastifyInstance } from 'fastify'
import { ZodError, z } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { prisma } from '../../../lib/prisma';

export const createPolls = async (app: FastifyInstance) => {

  app.post('/polls', async (request, reply) => {

    const createPollBody = z.object({
      title: z.string().min(5),
      options: z.array(z.string()).min(1)
    })

    try {
      const { title, options } = createPollBody.parse(request.body)

      const poll = await prisma.poll.create({
        data: {
          title,
          options: {
            createMany: {
              data: options.map( option => {
                return { title: option }
              })
            }
          }
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