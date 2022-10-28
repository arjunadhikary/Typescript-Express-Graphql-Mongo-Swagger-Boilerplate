import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  failOnErrors: true,
  openapi: '3.0.0',
  info: {
    title: 'Express Random Api',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [`${__dirname}/../routes/*`],
};

export const swaggerSpec = swaggerJSDoc(options);
