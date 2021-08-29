import { Router, Request, Response } from 'express';

const routes = Router();
import userRouter from '../../../modules/users/infra/http/routers/user.routes';

routes.get('/status', function (request: Request, response: Response) {
    response.json({
        version: '1.0',
    });
});

routes.use('/users', userRouter);

export default routes;