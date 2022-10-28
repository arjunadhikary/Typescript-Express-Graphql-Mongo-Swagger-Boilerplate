import express from 'express';
import { getUsers, createUser } from '../controllers/userController';
const userRouter = express.Router();

/**
 * @swagger
 * /users:
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

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Creates a new user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         description: The user to create.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             education:
 *               type: string
 *               example : "MSE"
 *             address:
 *               type: string
 *             password:
 *               type: string
 *             dob:
 *               type: date
 *               example: "2000-05-09"
 *             phone:
 *               type: string
 *             email:
 *               type: string
 *             modeofcontact:
 *               type: integer
 *
 *     responses:
 *       201:
 *         description: Created
 */
userRouter.post('/create', createUser);

export { userRouter };
