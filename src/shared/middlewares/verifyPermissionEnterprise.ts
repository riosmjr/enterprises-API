import AppError from "../errors/AppError";
import {Request, Response, NextFunction} from 'express';
import {container} from "tsyringe";
import {GetUserService} from "../../modules/users/services";

export default async function verifyPermissionEnterprise(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {

    const { enterprise_id } = request.params;
    const {profile_id, user_id} = request.user;

    if (profile_id === 1) {
        return next();
    }

    if (profile_id !== 1) {
        const getUser = container.resolve(GetUserService);
        const user = await getUser.execute(user_id);

        console.log(user);

        if (user && enterprise_id === user.enterprise_id) {
            return next();
        }

        throw new AppError('User not autorization.', 401);
    }

    return next();
}
