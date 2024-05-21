"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePoint = void 0;
const zod_1 = require("zod");
const firebase_1 = require("../lib/firebase");
const firestore_1 = require("firebase/firestore");
async function deletePoint(app) {
    app.withTypeProvider().delete("/point/:pointId", {
        schema: {
            params: zod_1.z.object({
                pointId: zod_1.z.string().uuid(),
            }),
            response: {
                200: zod_1.z.string(),
            },
        },
    }, async (request, reply) => {
        try {
            const { pointId } = request.params;
            const pointRef = (0, firestore_1.doc)(firebase_1.db, "points", pointId);
            await (0, firestore_1.deleteDoc)(pointRef);
            reply.status(200).send("Ponto removido com sucesso");
        }
        catch (error) { }
    });
}
exports.deletePoint = deletePoint;
