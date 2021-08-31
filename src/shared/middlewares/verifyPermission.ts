import AppError from "../errors/AppError";
import {Request, Response, NextFunction} from 'express';

export default function verifyPermission(
    request: Request,
    response: Response,
    next: NextFunction,
): void {

    const {user_id} = request.params;
    const {profile_id} = request.user;

    if (profile_id === 1) {
        return next();
    }

    //TODO Adicionar validação por empresa
    if (profile_id === 2 || profile_id === 3) {
        if (user_id === request.user.user_id) {
            return next();
        }

        throw new AppError('User not autorization.', 401);
    }

    if (profile_id === 4) {

        if (user_id === request.user.user_id) {
            return next();
        }

        throw new AppError('User not autorization.', 401);
    }
    return next();
}
