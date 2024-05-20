import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { db } from "../lib/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export async function updatePoints(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/points/:pointId",
    {
      schema: {
        body: z.object({
          date: z.string(),
          activities: z.array(
            z.object({
              startTime: z.string(),
              endTime: z.string(),
              description: z.string(),
              category: z.string(),
            })
          ),
        }),
        params: z.object({
          pointId: z.string().uuid(),
        }),
        response: {
          200: z.string(),
        },
      },
    },
    async (request, reply) => {
      const { pointId } = request.params;
      const { date, activities } = request.body;

      try {
        const pointRef = doc(db, "points", pointId);

        await updateDoc(pointRef, {
          date,
          activities,
        });

        reply.status(200).send("Ponto editado com sucesso");
      } catch (error) {}
    }
  );
}
