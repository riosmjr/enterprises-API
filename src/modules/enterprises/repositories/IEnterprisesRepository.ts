import Enterprise from '../infra/typeorm/entities/Enterprises';
import {ICreateEnterpriseDTO} from "../dtos/IEnterpriseDTO";
import User from "../../users/infra/typeorm/entities/Users";

export default interface IUsersRepository {
    createEnterprise(data: ICreateEnterpriseDTO): Promise<Enterprise>;
    findDirectorByEmail(email: string): Promise<User | undefined>;
}