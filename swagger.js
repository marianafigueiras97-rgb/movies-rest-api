const swaggerJsdoc = require("swagger-jsdoc");
const apiKeyAuth = require("./middleswares/apiKeyAuth");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Movies REST API",
            version: "1.0.0",
            description: "REST API for managing a movie collection using Node.js, Express and MongoDB."
        },

        servers: [
            {
                url: "/",
                description: "Current server"
            }
        ],

        components: {
            schemas: {

                // Schema para las respuestas de la API
                Movie: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "507f1f77bcf86cd799439011"
                        },
                        title: {
                            type: "string",
                            example: "The Matrix"
                        },
                        director: {
                            type: "string",
                            example: "Hermanas Wachowski"
                        },
                        year: {
                            type: "integer",
                            example: 1999
                        },
                        genre: {
                            type: "string",
                            example: "Ciencia ficción"
                        }
                    }
                },

                // Schema para reemplazar una película (PUT)
                MovieInput: {
                    type: "object",
                    required: ["title", "director", "year", "genre"],
                    additionalProperties: false,
                    properties: {
                        title: {
                            type: "string",
                            example: "The Matrix"
                        },
                        director: {
                            type: "string",
                            example: "Hermanas Wachowski"
                        },
                        year: {
                            type: "integer",
                            example: 1999
                        },
                        genre: {
                            type: "string",
                            example: "Ciencia ficción"
                        }
                    }
                },

                // Schema para actualizar parcialmente (PATCH)
                MoviePatch: {
                    type: "object",
                    minProperties: 1,
                    additionalProperties: false,
                    properties: {
                        title: {
                            type: "string",
                            example: "The Matrix Reloaded"
                        },
                        director: {
                            type: "string",
                            example: "Hermanas Wachowski"
                        },
                        year: {
                            type: "integer",
                            example: 2003
                        },
                        genre: {
                            type: "string",
                            example: "Acción"
                        }
                    }
                }
            },

            securitySchemes:{
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-api-key",
                    description: "API key required for write operations"
                }
            }
        }
    },

    apis: ["./routes/*.js"]
};

module.exports = swaggerJsdoc(options);