import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '../../../repositories/IUsersRepository';

import User from '../entities/Users';

export class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(user_id: string): Promise<User | undefined> {
        return await this.ormRepository.findOne(user_id);
    }
}

export default UsersRepository;
