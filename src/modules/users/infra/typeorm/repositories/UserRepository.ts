import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '../../../repositories/IUsersRepository';

import User from '../entities/Users';
import {ICreateUserDTO, IUpdateUserDTO} from "../../../dtos/IUserDTO";

export class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(user_id: string): Promise<User | undefined> {
        return await this.ormRepository.findOne(user_id);
    }

    public async createUser(data: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(data);
        await this.ormRepository.save(user);
        return user;
    }

    public async updateUser(User: User, data: IUpdateUserDTO): Promise<User> {
        const user = this.ormRepository.merge(User, data);
        await this.ormRepository.save(user);
        return user;
    }
}

export default UsersRepository;
