import AppError from "../errors/AppError";
import {Request, Response, NextFunction} from 'express';
import {container} from "tsyringe";
import {GetUserService} from "../../modules/users/services";

export default async function verifyPermission(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {

    const {user_id} = request.params;
    const {profile_id, enterprise_id} = request.user;

    if (profile_id === 1) {
        return next();
    }

    if (profile_id === 2 || profile_id === 3) {

        const getUser = container.resolve(GetUserService);
        const user = await getUser.execute(user_id);

        if (user && (user_id === request.user.user_id || enterprise_id === user.enterprise_id)) {
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
