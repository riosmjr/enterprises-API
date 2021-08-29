import User from '../../users/infra/typeorm/entities/Users';
import {ICreateUserDTO} from "../dtos/IUserDTO";

export default interface IUsersRepository {
    findById(user_id: string): Promise<User | undefined>;
    createUser(data: ICreateUserDTO): Promise<User>;
}
