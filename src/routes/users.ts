import express from 'express';
import { getUsers, createUser } from '../controllers/userController';
const userRouter = express.Router();

/**
 * @swagger
 * /user:
 *   get:
 *      description: Get the list of available users
 *      parameters:
 *          - in :
 *            name : limit
 *            description : limit ie number of users to fetch
 *            schema :
 *              type: string
 *          - in :
 *            name: page
 *            schema :
 *              type: string
 *            description : the page number
 *      responses:
 *       200:
 *         description: Returns list of users.
 */
userRouter.get('/', getUsers);
userRouter.post('/create', createUser);

export { userRouter };
