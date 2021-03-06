import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from "../controllers/UserController";
import authentication from "../../../../../shared/middlewares/authentication";
import verifyAdminPermission from "../../../../../shared/middlewares/verifyAdminPermission";
import verifyPermissionUser from "../../../../../shared/middlewares/verifyPermissionUser";

const usersRouter = Router();
const userController = new UserController();
usersRouter.use(authentication);

usersRouter.get(
    '/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
    }),
    verifyPermissionUser,
    userController.getUserById,
);

usersRouter.get(
    '',
    celebrate({
        [Segments.QUERY]: {
            name: Joi.string(),
            email: Joi.string(),
            birth_at_begin: Joi.date(),
            birth_at_end: Joi.date(),
            is_active: Joi.boolean(),
            city_id: Joi.number().integer().positive().max(5564),
            schooling_id: Joi.number().integer().positive().max(7),
            state_id: Joi.number().integer().positive().max(28),
            profile_id: Joi.number().integer().positive().max(4),
        }
    }),
    userController.getAllUsers,
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
            city_id: Joi.number().integer().positive().required().max(5564),
            schooling_id: Joi.number().integer().positive().required().max(7),
        }
    }),
    verifyAdminPermission,
    userController.createUser,
);

usersRouter.put(
    '/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        },
        [Segments.BODY]: {
            name: Joi.string(),
            email: Joi.string(),
            password: Joi.string(),
            birth_at: Joi.date(),
            is_active: Joi.boolean(),
            city_id: Joi.number().integer().positive().max(5564),
            schooling_id: Joi.number().integer().positive().max(7),
        }
    }),
    verifyPermissionUser,
    userController.updateUser,
);

usersRouter.delete(
    '/:user_id',
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        },
    }),
    verifyAdminPermission,
    userController.deleteUser,
);

export default usersRouter;