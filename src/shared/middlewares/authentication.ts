import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface ITokenPayload {
    user_id: string;
    profile_id: number;
}

export default function authentication(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing.', 401);
    }

    const [, token] = authHeader.split(' ');
    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const {user_id, profile_id} = decoded as ITokenPayload;

        request.user = {
          user_id: user_id,
          profile_id: profile_id,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
