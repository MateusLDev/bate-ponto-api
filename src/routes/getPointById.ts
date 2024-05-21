import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import { Points } from "../types/api";

export async function getPointById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/point/:pointId",
    {
      schema: {
        params: z.object({
          pointId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
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
        },
      },
    },
    async (request, reply) => {
      try {
        const { pointId } = request.params;

        const pointRef = doc(db, "points", pointId);
        const pointSnap = await getDoc(pointRef);
        const point = pointSnap.data() as Points;

        if (!point) throw new Error("Ponto não encontrado");

        return reply.send({
          id: point.id,
          date: point?.date,
          activities: point.activities?.map((activity) => {
            return {
              startTime: activity.startTime,
              endTime: activity.endTime,
              description: activity.description,
              category: activity.category,
            };
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
  );
}
