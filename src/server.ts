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

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify();

app.register(fastifySwagger,
  {
    swagger: {
      info: {
        title: "bateponto-api",
        description: "Especificações da API para o back-end da aplicação Bate Ponto",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  }
)

app.register(fastifySwaggerUi, {
  routePrefix: "/documentation",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(getPoints);
app.register(createPoint);
app.register(updatePoints);
app.register(deletePoint)

app.listen({ port: 3333 }).then(() => {
  console.log("Server running");
});
