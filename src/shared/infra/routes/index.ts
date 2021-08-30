import { Router, Request, Response } from 'express';

const routes = Router();
import userRouter from '../../../modules/users/infra/http/routers/user.routes';
import authRouter from '../../../modules/users/infra/http/routers/auth.routes';

routes.get('/status', function (request: Request, response: Response) {
    response.json({
        version: '1.0',
    });
});

routes.use('/users', userRouter);
routes.use('/auth', authRouter);

export default routes;