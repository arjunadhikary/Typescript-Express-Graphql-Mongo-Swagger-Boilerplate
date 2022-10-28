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
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

console.log(__dirname);

const options = {
  swaggerDefinition,
  apis: [`${__dirname}/../routes/*.ts`],
};

export const swaggerSpec = swaggerJSDoc(options);
