import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '../../../repositories/IUsersRepository';

import User from '../entities/Users';
import {ICreateUserDTO, IFiltersGetAllUsersDTO, IUpdateUserDTO} from "../../../dtos/IUserDTO";

export class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(user_id: string): Promise<User | undefined> {
        return await this.ormRepository.findOne(user_id);
    }

    public async findAll(filters: IFiltersGetAllUsersDTO): Promise<User[]> {
        const query = this.ormRepository.createQueryBuilder('us')
            .where(`deleted_at is null`);

        if (filters.is_active !== undefined) {
            query.andWhere(`is_active = ${(!!filters.is_active)}`);
        }

        return await query.getRawMany();
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

    public async deleteUser(User: User): Promise<User> {
        const user = this.ormRepository.merge(User, {is_active: false, updated_at: new Date(), deleted_at: new Date()});
        await this.ormRepository.save(user);
        return user;
    }
}

export default UsersRepository;
