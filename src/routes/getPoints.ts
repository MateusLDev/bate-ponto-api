import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { db, uploadProcessedData } from "../lib/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Points } from "../types/api";

export async function getPoints(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/points",
    {
      schema: {
        response: {
          200: z.object({
            points: z.array(
              z.object({
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
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const collectionRef = collection(db, "points");

        const points: Points[] = [];

        const q = query(collectionRef);

        const docSnap = await getDocs(q);

        docSnap.forEach((doc) => {
          points.push(doc.data() as Points);
        });

        return reply.send({
          points: points.map((point) => {
            return {
              id: point.id,
              date: point.date,
              activities: point.activities.map((activity) => {
                return {
                  startTime: activity.startTime,
                  endTime: activity.endTime,
                  description: activity.description,
                  category: activity.category,
                };
              }),
            };
          }),
        });
      } catch (error) {
        console.log("error");
      }
    }
  );
}
