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

usersRouter.post(
    '',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            birth_at: Joi.date().required(),
            is_active: Joi.boolean().default(true),
            city_id: Joi.number().integer().required(),
            schooling_id: Joi.number().integer().required(),
            profile_id: Joi.number().integer().required(),
        }
    }),
    userController.createUser,
);

export default usersRouter;