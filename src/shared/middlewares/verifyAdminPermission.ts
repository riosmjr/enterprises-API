import AppError from "../errors/AppError";
import {Request, Response, NextFunction} from 'express';

export default function verifyAdminPermission(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    console.log(request.user)

    if (request.user.profile_id !== 1) {
        throw new AppError('User not autorization, administrator permission required.', 401);
    }

    return next();
}
