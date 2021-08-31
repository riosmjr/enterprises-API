import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
const bcrypt = require("bcrypt");
import { sign } from 'jsonwebtoken';

import authConfig from '../../../../../shared/config/auth';
import AppError from '../../../../../shared/errors/AppError';

import { GetUserByEmailService } from '../../../services';

export default class AuthController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const getUser = container.resolve(GetUserByEmailService);
    const user = await getUser.execute(email);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    if (!user.password) {
      throw new AppError('Password not registered', 303);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Wrong password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const api_token = sign({user_id: user.user_id, profile_id: user}, secret, {expiresIn});

    return response.json({ user: classToClass(user), api_token });
  }
}
