import { Connection, getConnection } from 'typeorm';

import IEnterprisesRepository from "../../../repositories/IEnterprisesRepository";

import Enterprise from "../entities/Enterprises";
import {ICreateEnterpriseDTO, IFiltersGetAllEnterprisesDTO, IUpdateEnterpriseDTO} from "../../../dtos/IEnterpriseDTO";

import User from "../../../../users/infra/typeorm/entities/Users";
import {format} from "date-fns";

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

    public async findAll(filters: IFiltersGetAllEnterprisesDTO): Promise<Enterprise[] | undefined> {
        const query = this.ormRepository.getRepository(Enterprise).createQueryBuilder('en')
            .where(`en.deleted_at is null`);

        if (filters.name) {
            query.andWhere(`en.name like '%${filters.name}%'`);
        }

        if (filters.occupation_area) {
            query.andWhere(`en.occupation_area like '%${filters.occupation_area}%'`);
        }

        if (filters.description) {
            query.andWhere(`en.description like '%${filters.description}%'`);
        }

        if (filters.director) {
            query.andWhere(`en.director like '%${filters.director}%'`);
        }

        if (filters.founded_at_begin) {
            query.andWhere(`en.founded_at >= '${format(filters.founded_at_begin, 'yyyy-MM-dd')}'`);
        }

        if (filters.founded_at_end) {
            query.andWhere(`en.founded_at <= '${format(filters.founded_at_end, 'yyyy-MM-dd')}'`);
        }

        if (filters.is_active !== undefined) {
            query.andWhere(`en.is_active = ${(!!filters.is_active)}`);
        }

        return await query.getRawMany();
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
