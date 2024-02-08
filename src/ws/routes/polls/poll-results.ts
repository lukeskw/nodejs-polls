import { FastifyInstance } from "fastify";
import { voting } from "../../../utils/voting-pubsub";
import z, { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export const pollResultsWs = async(app: FastifyInstance) => {
  app.get('/polls/:pollId/results', { websocket: true }, ( connection, request ) => {
    // pub/sub pattern
    //subscribe only on published messages on the channel with pollId

      const getPollParam = z.object({
        pollId: z.string().uuid(),
      })

      try {

        const { pollId } = getPollParam.parse(request.params)

        voting.subscribe(pollId, (message) => {
          connection.socket.send(JSON.stringify(message));
        })

      } catch( err ){
        if(err instanceof ZodError){
          const validationError = fromZodError(err);
          console.error('Error parsing request:', validationError.message);
          return connection.socket.send({ error: validationError.message });
        }
        console.error(String(err))
        throw new Error(String(err))
      }
  })
}