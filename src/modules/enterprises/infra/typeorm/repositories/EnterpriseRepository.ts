import { Connection, getConnection } from 'typeorm';

import IEnterprisesRepository from "../../../repositories/IEnterprisesRepository";

import Enterprise from "../entities/Enterprises";
import {ICreateEnterpriseDTO} from "../../../dtos/IEnterpriseDTO";

import User from "../../../../users/infra/typeorm/entities/Users";

export class EnterpriseRepository implements IEnterprisesRepository {
    private ormRepository: Connection;

    constructor() {
        this.ormRepository = getConnection();
    }

    public async createEnterprise(data: ICreateEnterpriseDTO): Promise<Enterprise> {
        const enterprise = this.ormRepository.getRepository(Enterprise).create(data);
        await this.ormRepository.getRepository(Enterprise).save(enterprise);
        return enterprise;
    }

    public async findDirectorByEmail(email: string): Promise<User | undefined> {
        return await this.ormRepository.getRepository(User).findOne({email});
    }
}

export default EnterpriseRepository;
