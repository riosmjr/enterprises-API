import User from '../../users/infra/typeorm/entities/Users';
import {ICreateUserDTO, IUpdateUserDTO} from "../dtos/IUserDTO";

export default interface IUsersRepository {
    findById(user_id: string): Promise<User | undefined>;
    createUser(data: ICreateUserDTO): Promise<User>;
    updateUser(user: User, data: IUpdateUserDTO): Promise<User>;
}