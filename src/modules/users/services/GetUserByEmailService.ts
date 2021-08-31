import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IUsersRepository from '../../users/repositories/IUsersRepository';

import {IGetUserByEmailDTO} from "../dtos/IUserDTO";

@injectable()
export class GetUserByEmailService {
    constructor(
        @inject(`UsersRepository`)
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(email: string): Promise<IGetUserByEmailDTO> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exist or has been deleted', 404);
        }

        return user;
    }
}
