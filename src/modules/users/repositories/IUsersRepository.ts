import User from '../../users/infra/typeorm/entities/Users';
import {ICreateUserDTO, IFiltersGetAllUsersDTO, IGetUserDTO, IUpdateUserDTO} from "../dtos/IUserDTO";
import {Request} from "express";

export default interface IUsersRepository {
    findById(user_id: string): Promise<User | undefined>;
    findUser(user_id: string): Promise<IGetUserDTO | undefined>;
    findByEmail(email: string): Promise<IGetUserDTO | undefined>;
    findAll(filters: IFiltersGetAllUsersDTO, request: Request): Promise<User[]>;
    createUser(data: ICreateUserDTO): Promise<User>;
    updateUser(user: User, data: IUpdateUserDTO): Promise<User>;
    deleteUser(user: User): Promise<User>;
}