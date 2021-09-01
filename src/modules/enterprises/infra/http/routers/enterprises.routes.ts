import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnterprisesController from '../controllers/EnterprisesController';
import authentication from "../../../../../shared/middlewares/authentication";
import verifyAdminPermission from "../../../../../shared/middlewares/verifyAdminPermission";
import verifyPermissionEnterprise from "../../../../../shared/middlewares/verifyPermissionEnterprise";

const enterprisesRouter = Router();
const enterprisesController = new EnterprisesController();
enterprisesRouter.use(authentication);

enterprisesRouter.get(
    '/find-link-user-enterprisse',
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
            enterprise_id: Joi.string().uuid({ version: 'uuidv4' }).allow(null),
        }
    }),
    enterprisesController.getAllLinkEnterprisesUsers,
)

enterprisesRouter.get(
    '/:enterprise_id',
    celebrate({
        [Segments.PARAMS]: {
            enterprise_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
    }),
    verifyPermissionEnterprise,
    enterprisesController.getEnterpriseById,
);

enterprisesRouter.get(
    '',
    celebrate({
        [Segments.QUERY]: {
            name: Joi.string(),
            occupation_area: Joi.string(),
            description: Joi.string(),
            director: Joi.string().email(),
            founded_at_begin: Joi.date(),
            founded_at_end: Joi.date(),
            is_active: Joi.boolean(),
        }
    }),
    verifyAdminPermission,
    enterprisesController.getAllEnterprises,
);

enterprisesRouter.post(
    '',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            occupation_area: Joi.string().required(),
            description: Joi.string().required(),
            director: Joi.string().email().required(),
            founded_at: Joi.date().required(),
            is_active: Joi.boolean(),
        },
    }),
    verifyAdminPermission,
    enterprisesController.createEnterprise,
);

enterprisesRouter.put(
    '/:enterprise_id',
    celebrate({
        [Segments.PARAMS]: {
            enterprise_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        },
        [Segments.BODY]: {
            name: Joi.string(),
            occupation_area: Joi.string(),
            description: Joi.string(),
            director: Joi.string().email(),
            founded_at: Joi.date(),
            is_active: Joi.boolean(),
        },
    }),
    verifyPermissionEnterprise,
    enterprisesController.updateEnterprise,
);

enterprisesRouter.delete(
    '/:enterprise_id',
    celebrate({
        [Segments.PARAMS]: {
            enterprise_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        },
    }),
    verifyAdminPermission,
    enterprisesController.deleteEnterprise,
);

enterprisesRouter.post(
    '/link-user-with-enterprise',
    celebrate({
        [Segments.BODY]: {
            enterprise_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
            user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
            profile_id: Joi.number().integer().positive().max(4).required(),

        }
    }),
    enterprisesController.linkUserWithEnterprise,
)

enterprisesRouter.post(
    '/unlink-user-enterprise',
    celebrate({
        [Segments.BODY]: {
            enterprise_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
            user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
            profile_id: Joi.number().integer().positive().max(4).required(),

        }
    }),
    enterprisesController.unlinkUserEnterprise,
)

export default enterprisesRouter;
