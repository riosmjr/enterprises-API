import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnterprisesController from '../controllers/EnterprisesController';

const enterprisesRouter = Router();
const enterprisesController = new EnterprisesController();

enterprisesRouter.get(
    '/:enterprise_id',
    celebrate({
        [Segments.PARAMS]: {
            enterprise_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
    }),
    enterprisesController.getEnterpriseById,
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
    enterprisesController.createEnterprises,
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
    enterprisesController.updateEnterprises,
);

export default enterprisesRouter;
