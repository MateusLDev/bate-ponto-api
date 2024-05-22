import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { db } from "../lib/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Points, PointsList, Activities } from "../types/api";

const getAllIntervals = (activities: Activities[]) => 
  activities.filter(activity => activity.category === 'Intervalo')


const checkIfHasIntervalInActivities = (activities: Activities[]) => {
  const intervals = getAllIntervals(activities)

  return intervals.length ? true : false
}

function timeStringToMinutes(timeString: string) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

function minutesToTimeString(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
}

function sumTimes(activities: Activities[]) {
  let totalMinutes = 0;

  activities.forEach(activity => {
    const startMinutes = timeStringToMinutes(activity.startTime);
    const endMinutes = timeStringToMinutes(activity.endTime);

    totalMinutes += endMinutes - startMinutes;
  });

  return minutesToTimeString(totalMinutes);
}

const getIntervalDuration = (activities: Activities[]) => {
  const intervals = getAllIntervals(activities)
  const totalHours = 0

  if(intervals.length === 0) return null

  return sumTimes(intervals)
}

const getTotalHours = (activities: Activities[]) => {
const validHours = activities.filter(activity => activity.category !== 'Intervalo')

// const teste = activities.filter(activity => activity.) Criar uma logica pra usar o getAllIntervals pra pegar apenas a diferença entre esses arrys 

if(validHours.length === 0) return null

return sumTimes(validHours)
}

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
                startTime: z.string(),
                endTime: z.string(),
                hasInterval: z.boolean(),
                intervalDuration: z.string().nullable(),
                totalHours: z.string().nullable(),
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
              startTime: point.activities[0].startTime,
              endTime: point.activities[point.activities.length - 1]?.endTime,
              hasInterval: checkIfHasIntervalInActivities(point.activities),
              intervalDuration: getIntervalDuration(point.activities),
              totalHours: getTotalHours(point.activities)
            };
          }),
        });
      } catch (error) {
        console.log("error");
      }
    }
  );
}
