import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { db } from "../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function deletePoint(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/point/:pointId",
    {
      schema: {
        params: z.object({
          pointId: z.string().uuid(),
        }),
        response: {
          200: z.string(),
        },
      },
    },
    async (request, reply) => {
      try {
        const { pointId } = request.params;

        const pointRef = doc(db, "points", pointId);

        await deleteDoc(pointRef);

        reply.status(200).send("Ponto removido com sucesso");
      } catch (error) {}
    }
  );
}
