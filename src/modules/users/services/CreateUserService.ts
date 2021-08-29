import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../../users/repositories/IUsersRepository';

import User from '../../users/infra/typeorm/entities/Users';
import {ICreateUserDTO} from "../dtos/IUserDTO";

@injectable()
export class CreateUserService {
    constructor(
        @inject(`UsersRepository`)
        private usersRepository: IUsersRepository,
    ) {}

    public async execute(data: ICreateUserDTO): Promise<User> {
        return await this.usersRepository.createUser(data);
    }
}
