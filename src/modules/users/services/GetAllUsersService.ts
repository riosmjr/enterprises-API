import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IUsersRepository from '../../users/repositories/IUsersRepository';

import User from '../../users/infra/typeorm/entities/Users';

import {IFiltersGetAllUsersDTO} from "../dtos/IUserDTO";

@injectable()
export class GetAllUsersService {
    constructor(
        @inject(`UsersRepository`)
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(filters: IFiltersGetAllUsersDTO): Promise<User[]> {
        const users = await this.usersRepository.findAll(filters);

        if (!users) {
            throw new AppError('No users found', 404);
        }

        return users;
    }
}
