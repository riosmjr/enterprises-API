import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../../users/repositories/IUsersRepository';

import User from '../../users/infra/typeorm/entities/Users';
import {IUpdateUserDTO} from "../dtos/IUserDTO";
import AppError from "../../../shared/errors/AppError";

@injectable()
export class UpdateUserService {
    constructor(
        @inject(`UsersRepository`)
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(data: IUpdateUserDTO, user_id: string): Promise<User> {

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return await this.usersRepository.updateUser(user, data);
    }
}
