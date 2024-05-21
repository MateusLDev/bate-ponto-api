"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPoint = void 0;
const zod_1 = require("zod");
const firebase_1 = require("../lib/firebase");
const firestore_1 = require("firebase/firestore");
const crypto_1 = require("crypto");
async function createPoint(app) {
    app.withTypeProvider().post("/point", {
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
            response: {
                201: zod_1.z.string(),
            },
        },
    }, async (request, reply) => {
        const { date, activities } = request.body;
        try {
            const pointID = (0, crypto_1.randomUUID)();
            const point = {
                id: pointID,
                date,
                activities,
            };
            try {
                const document = (0, firestore_1.doc)(firebase_1.db, "points", pointID);
                let dataUploaded = await (0, firestore_1.setDoc)(document, point);
            }
            catch (error) {
                console.log(error);
            }
            reply.status(201).send('Ponto criado com sucesso');
        }
        catch (error) {
            reply.status(400).send('Erro ao criar ponto');
        }
    });
}
exports.createPoint = createPoint;
