import { Request, Response } from 'express';
import { UserModel } from '../schema/Users';

interface QueryParams {
  page: string;
  limit: string;
}
const getUsers = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) => {
  try {
    const page = req.query.page !== undefined ? req.query.page : 1;
    const limit = req.query.limit !== undefined ? req.query.limit : 10;
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
};

const createUser = async (req: Request, res: Response) => {
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
};

export { createUser, getUsers };
