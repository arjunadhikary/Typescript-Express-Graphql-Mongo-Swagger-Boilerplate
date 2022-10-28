import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { root, schema } from './graphql/users';
import cors from 'cors';
import './connections/mongodb';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './routes/users';
import { swaggerSpec } from './helper/swagger';
const app = express();
const port = 8080;

app.use(
  cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
