import User from '../../users/infra/typeorm/entities/Users';
import {ICreateUserDTO, IFiltersGetAllUsersDTO, IGetUserByEmailDTO, IUpdateUserDTO} from "../dtos/IUserDTO";

export default interface IUsersRepository {
    findById(user_id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<IGetUserByEmailDTO | undefined>;
    findAll(filters: IFiltersGetAllUsersDTO): Promise<User[]>;
    createUser(data: ICreateUserDTO): Promise<User>;
    updateUser(user: User, data: IUpdateUserDTO): Promise<User>;
    deleteUser(user: User): Promise<User>;
}