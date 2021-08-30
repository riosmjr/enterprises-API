import Enterprise from '../infra/typeorm/entities/Enterprises';
import {ICreateEnterpriseDTO, IUpdateEnterpriseDTO} from "../dtos/IEnterpriseDTO";
import User from "../../users/infra/typeorm/entities/Users";

export default interface IUsersRepository {
    findById(enterprise_id: string): Promise<Enterprise | undefined>;
    findDirectorByEmail(email: string): Promise<User | undefined>;
    createEnterprise(data: ICreateEnterpriseDTO): Promise<Enterprise>;
    updateEnterprise(enterprise: Enterprise, data: IUpdateEnterpriseDTO): Promise<Enterprise>;
    deleteEnterprise(enterprise: Enterprise): Promise<Enterprise>;
}