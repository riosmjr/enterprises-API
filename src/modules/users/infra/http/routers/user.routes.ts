import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from "../controllers/UserController";

const usersRouter = Router();
const userController = new UserController();

usersRouter.get(
    '/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().required()
        }
    }),
    userController.getUserById,
);

export default usersRouter;