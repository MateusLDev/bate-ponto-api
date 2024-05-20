import fastify from "fastify";
import { initializeFirebase } from "./lib/firebase";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { getPoints } from "./routes/getPoints";
import { createPoint } from "./routes/createPoint";
import { updatePoints } from "./routes/UpdatePoint";
import { deletePoint } from "./routes/deletePoint";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getPoints);
app.register(createPoint);
app.register(updatePoints);
app.register(deletePoint)

app.listen({ port: 3333 }).then(() => {
  console.log("Server running");
});
