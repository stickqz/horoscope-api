import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Horoscope API',
      version: '1.0.0',
      description: 'Daily horoscopes with JWT auth'
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            zodiacSign: { type: 'string' },
            birthdate: { type: 'string' }
          }
        },
        Error: {
          type: 'object',
          properties: { error: { type: 'string' } }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

export const specs = swaggerJsdoc(options);
