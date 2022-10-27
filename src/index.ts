import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { root, schema } from './graphql/users';
import { UserModel } from './schema/Users';
import './connections/mongodb';
const app = express();
const port = 8080; // default port to listen
app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/createUser', async (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    const user = new UserModel({ ...body });
    const resData = await user.save();
    res.status(200).send({
      msg: 'User Created',
      data: resData,
    });
  } catch (error: unknown) {
    console.log(error);

    res.status(500).send({
      data: 'Error',
      error: error instanceof Error ? error.message : 'Error',
    });
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
