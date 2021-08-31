import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '../../../repositories/IUsersRepository';
import {format} from 'date-fns';

import User from '../entities/Users';
import {ICreateUserDTO, IFiltersGetAllUsersDTO, IGetUserByEmailDTO, IUpdateUserDTO} from "../../../dtos/IUserDTO";

export class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(user_id: string): Promise<User | undefined> {
        return await this.ormRepository.findOne(user_id);
    }

    public async findByEmail(email: string): Promise<IGetUserByEmailDTO | undefined> {
        return await this.ormRepository.createQueryBuilder('us')
            .select('us.user_id, us.name, us.email, us.password, eu.profile_id')
            .leftJoin('enterpriseuser', 'eu', 'eu.user_id = us.user_id')
            .where(`us.email = '${email}'`)
            .getRawOne();
    }

    public async findAll(filters: IFiltersGetAllUsersDTO): Promise<User[]> {
        const query = this.ormRepository.createQueryBuilder('us')
            .innerJoin('enterpriseuser', 'eu', 'eu.user_id = us.user_id')
            .where(`deleted_at is null`);

        if (filters.name) {
            query.andWhere(`us.name like '%${filters.name}%'`);
        }

        if (filters.email) {
            query.andWhere(`us.email like '%${filters.email}%'`);
        }

        if (filters.birth_at_begin) {
            query.andWhere(`us.birth_at >= '${format(filters.birth_at_begin, 'yyyy-MM-dd')}'`);
        }

        if (filters.birth_at_end) {
            query.andWhere(`us.birth_at <= '${format(filters.birth_at_end, 'yyyy-MM-dd')}'`);
        }

        if (filters.is_active !== undefined) {
            query.andWhere(`us.is_active = ${(!!filters.is_active)}`);
        }

        if (filters.city_id) {
            query.andWhere(`us.city_id = ${filters.city_id}`);
        }

        if (filters.state_id) {
            query.innerJoin('cities', 'ci', `ci.city_id = us.city_id AND ci.state_id = ${filters.state_id}`);
        }

        if (filters.schooling_id) {
            query.andWhere(`us.schooling_id = ${filters.schooling_id}`);
        }

        if (filters.profile_id) {
            query.andWhere(`eu.profile_id = ${filters.profile_id}`);
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
