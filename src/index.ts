import express, { Request } from 'express';
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

interface QueryParams {
  page: string;
  limit: string;
}
//@TODO mongoose-paginate-v2 can also be used
//It doesn't scale for large datasets. As it scans the record one by one and skip or offset it, If your database has a million records, it will effect scalability
app.get('/getUsers', async (req: Request<{}, {}, {}, QueryParams>, res) => {
  try {
    const { limit, page } = req.query;
    console.log(page, limit);

    const posts = await UserModel.find()
      .limit(+limit * 1)
      .skip((+page - 1) * +limit)
      .exec();

    const count = await UserModel.count();

    res.json({
      posts,
      totalPages: Math.ceil(count / +limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).send({
      error: error instanceof Error ? error.message : 'Error',
    });
  }
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
