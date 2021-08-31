import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IUsersRepository from '../../users/repositories/IUsersRepository';

import {IGetUserDTO} from "../dtos/IUserDTO";

@injectable()
export class GetUserService {
    constructor(
        @inject(`UsersRepository`)
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(user_id: string): Promise<IGetUserDTO> {
        const user = await this.usersRepository.findUser(user_id);

        if (!user) {
            throw new AppError('User does not exist or has been deleted', 404);
        }

        return user;
    }
}
