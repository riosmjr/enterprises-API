import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnterprisesController from '../controllers/EnterprisesController';

const enterprisesRouter = Router();
const enterprisesController = new EnterprisesController();

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

export default enterprisesRouter;
