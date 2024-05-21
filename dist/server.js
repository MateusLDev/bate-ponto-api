"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const getPoints_1 = require("./routes/getPoints");
const createPoint_1 = require("./routes/createPoint");
const UpdatePoint_1 = require("./routes/UpdatePoint");
const deletePoint_1 = require("./routes/deletePoint");
const app = (0, fastify_1.default)();
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
app.register(getPoints_1.getPoints);
app.register(createPoint_1.createPoint);
app.register(UpdatePoint_1.updatePoints);
app.register(deletePoint_1.deletePoint);
app.listen({ port: 3333 }).then(() => {
    console.log("Server running");
});
