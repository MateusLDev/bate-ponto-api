import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Points } from "../types/api";
import { randomUUID } from "crypto";

export async function createPoint(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/point",
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
        response: {
          201: z.string(),
        },
      },
    },
    async (request, reply) => {
      const { date, activities } = request.body
      try {
        const pointID = randomUUID()
        const point = {
          id: pointID,
          date,
          activities,
        };
      
        try {
          const document = doc(db, "points", pointID);
          let dataUploaded = await setDoc(document, point);
        } catch (error) {
          console.log(error);
        }

        reply.status(201).send('Ponto criado com sucesso')
      } catch (error) {
        reply.status(400).send('Erro ao criar ponto')
      }
    }
  );
}
