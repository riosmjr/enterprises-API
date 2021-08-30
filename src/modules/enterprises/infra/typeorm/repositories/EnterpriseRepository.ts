import { Connection, getConnection } from 'typeorm';

import IEnterprisesRepository from "../../../repositories/IEnterprisesRepository";

import Enterprise from "../entities/Enterprises";
import {ICreateEnterpriseDTO, IUpdateEnterpriseDTO} from "../../../dtos/IEnterpriseDTO";

import User from "../../../../users/infra/typeorm/entities/Users";

export class EnterpriseRepository implements IEnterprisesRepository {
    private ormRepository: Connection;

    constructor() {
        this.ormRepository = getConnection();
    }

    public async findById(enterprise_id: string): Promise<Enterprise | undefined> {
        return await this.ormRepository.getRepository(Enterprise).findOne(enterprise_id);
    }

    public async findDirectorByEmail(email: string): Promise<User | undefined> {
        return await this.ormRepository.getRepository(User).findOne({email});
    }

    public async createEnterprise(data: ICreateEnterpriseDTO): Promise<Enterprise> {
        const enterprise = this.ormRepository.getRepository(Enterprise).create(data);
        await this.ormRepository.getRepository(Enterprise).save(enterprise);
        return enterprise;
    }

    public async updateEnterprise(enterprise: Enterprise,data: IUpdateEnterpriseDTO): Promise<Enterprise> {
        const enterpriseUpdate = this.ormRepository.getRepository(Enterprise).merge(enterprise, data);
        await this.ormRepository.getRepository(Enterprise).save(enterpriseUpdate);
        return enterpriseUpdate;
    }

    public async deleteEnterprise(enterprise: Enterprise): Promise<Enterprise> {
        const enterpriseDelete = this.ormRepository.getRepository(Enterprise).merge(enterprise, {is_active: false, updated_at: new Date(), deleted_at: new Date()});
        await this.ormRepository.getRepository(Enterprise).save(enterpriseDelete);
        return enterpriseDelete;
    }
}

export default EnterpriseRepository;
