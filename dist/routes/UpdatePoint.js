"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePoints = void 0;
const zod_1 = require("zod");
const firebase_1 = require("../lib/firebase");
const firestore_1 = require("firebase/firestore");
async function updatePoints(app) {
    app.withTypeProvider().put("/points/:pointId", {
        schema: {
            body: zod_1.z.object({
                date: zod_1.z.string(),
                activities: zod_1.z.array(zod_1.z.object({
                    startTime: zod_1.z.string(),
                    endTime: zod_1.z.string(),
                    description: zod_1.z.string(),
                    category: zod_1.z.string(),
                })),
            }),
            params: zod_1.z.object({
                pointId: zod_1.z.string().uuid(),
            }),
            response: {
                200: zod_1.z.string(),
            },
        },
    }, async (request, reply) => {
        const { pointId } = request.params;
        const { date, activities } = request.body;
        try {
            const pointRef = (0, firestore_1.doc)(firebase_1.db, "points", pointId);
            await (0, firestore_1.updateDoc)(pointRef, {
                date,
                activities,
            });
            reply.status(200).send("Ponto editado com sucesso");
        }
        catch (error) { }
    });
}
exports.updatePoints = updatePoints;
