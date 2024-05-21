"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoints = void 0;
const zod_1 = require("zod");
const firebase_1 = require("../lib/firebase");
const firestore_1 = require("firebase/firestore");
async function getPoints(app) {
    app.withTypeProvider().get("/points", {
        schema: {
            response: {
                200: zod_1.z.object({
                    points: zod_1.z.array(zod_1.z.object({
                        id: zod_1.z.string().uuid(),
                        date: zod_1.z.string(),
                        activities: zod_1.z.array(zod_1.z.object({
                            startTime: zod_1.z.string(),
                            endTime: zod_1.z.string(),
                            description: zod_1.z.string(),
                            category: zod_1.z.string(),
                        })),
                    })),
                }),
            },
        },
    }, async (request, reply) => {
        try {
            const collectionRef = (0, firestore_1.collection)(firebase_1.db, "points");
            const points = [];
            const q = (0, firestore_1.query)(collectionRef);
            const docSnap = await (0, firestore_1.getDocs)(q);
            docSnap.forEach((doc) => {
                points.push(doc.data());
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
        }
        catch (error) {
            console.log("error");
        }
    });
}
exports.getPoints = getPoints;
