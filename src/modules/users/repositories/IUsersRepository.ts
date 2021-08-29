import User from '../../users/infra/typeorm/entities/Users';

export default interface IUsersRepository {
    findById(user_id: string): Promise<User | undefined>;
}
