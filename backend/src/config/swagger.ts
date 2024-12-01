import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the application",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT token for authentication",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "error",
            },
            statusCode: {
              type: "integer",
              example: 400,
            },
            timeStamp: {
              type: "string",
              format: "date-time",
            },
            path: {
              type: "string",
            },
            message: {
              type: "string",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
              },
            },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              enum: ["success", "error"],
            },
            statusCode: {
              type: "integer",
            },
            timeStamp: {
              type: "string",
              format: "date-time",
            },
            path: {
              type: "string",
            },
            data: {
              type: "object",
            },
            message: {
              type: "string",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
              },
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  statusCode: {
                    type: "integer",
                    example: 404,
                  },
                  timeStamp: {
                    type: "string",
                    format: "date-time",
                  },
                  path: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                    example: "Resource not found",
                  },
                },
              },
            },
          },
        },
        Conflict: {
          description: "Resource already exists",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  statusCode: {
                    type: "integer",
                    example: 409,
                  },
                  timeStamp: {
                    type: "string",
                    format: "date-time",
                  },
                  path: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                    example: "Resource already exists",
                  },
                },
              },
            },
          },
        },
        ValidationError: {
          description: "Validation failed",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  statusCode: {
                    type: "integer",
                    example: 400,
                  },
                  timeStamp: {
                    type: "string",
                    format: "date-time",
                  },
                  path: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                    example: "Validation failed",
                  },
                  errors: {
                    type: "array",
                    items: {
                      type: "object",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/modules/*/routes/*.ts",
    "./src/modules/*/types/*.ts",
    "./src/shared/types/*.ts",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
