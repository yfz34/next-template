import { StatusCodes } from "http-status-codes";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

import { logger } from "@/lib/logger";
import configureOpenAPI from "@/lib/hono/open-api";

const app = new OpenAPIHono().basePath("/api");

configureOpenAPI(app);

const userRoute = createRoute({
  method: "get",
  path: "/users/{id}",
  request: {
    params: z.object({
      id: z
        .string()
        .min(3)
        .openapi({
          param: {
            name: "id",
            in: "path",
          },
          example: "1212121",
        }),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z
            .object({
              id: z.string().openapi({
                example: "123",
              }),
              name: z.string().openapi({
                example: "John Doe",
              }),
              age: z.number().openapi({
                example: 42,
              }),
            })
            .openapi("User"),
        },
      },
      description: "Retrieve the user",
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.openapi(userRoute, async (c) => {
  const { id } = c.req.valid("param");
  logger.info(`Fetching user with id: ${id}`);
  return c.json(
    {
      id,
      age: 20,
      name: "Ultra-man",
    },
    StatusCodes.OK
  );
});

export default app;

export type AppType = typeof routes;
