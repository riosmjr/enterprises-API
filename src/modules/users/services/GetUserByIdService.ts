import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IUsersRepository from '../../users/repositories/IUsersRepository';

import User from '../../users/infra/typeorm/entities/Users';

@injectable()
export class GetUserByIdService {
    constructor(
        @inject(`UsersRepository`)
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(user_id: string): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User does not exist or has been deleted', 404);
        }

        return user;
    }
}
