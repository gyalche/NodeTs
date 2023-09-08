import { Express, Response, Request } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
  defination: {
    openapi: '3.0.0',
    info: {
      title: 'REST API doc',
      version,
    },
    components: {
      securitySchema: {
        bearerAuth: {
          type: 'http',
          schema: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes.ts', './src/schema/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  //Swagger page;
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  //Docs in JSON format;
  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
