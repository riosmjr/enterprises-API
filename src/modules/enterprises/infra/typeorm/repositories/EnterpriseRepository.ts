import { Connection, getConnection } from 'typeorm';

import IEnterprisesRepository from "../../../repositories/IEnterprisesRepository";

import Enterprise from "../entities/Enterprises";
import {
    ICreateEnterpriseDTO,
    ICreateLinkUserWithEnterpriseDTO,
    IFiltersGetAllEnterprisesDTO,
    IFiltersGetAllEnterprisesUsersDTO,
    IUpdateEnterpriseDTO
} from "../../../dtos/IEnterpriseDTO";

import User from "../../../../users/infra/typeorm/entities/Users";
import {format} from "date-fns";
import {IGetUserDTO} from "../../../../users/dtos/IUserDTO";
import EnterpriseUser from "../entities/EnterpriseUser";
import {Request} from "express";

export class EnterpriseRepository implements IEnterprisesRepository {
    private ormRepository: Connection;

    constructor() {
        this.ormRepository = getConnection();
    }

    public async findById(enterprise_id: string): Promise<Enterprise | undefined> {
        return await this.ormRepository.getRepository(Enterprise).findOne(enterprise_id);
    }

    public async findDirectorByEmail(email: string): Promise<IGetUserDTO | undefined> {
        return await this.ormRepository.getRepository(User).createQueryBuilder('us')
            .select('us.user_id, us.name, eu.profile_id')
            .leftJoin('enterpriseuser', 'eu', 'eu.user_id = us.user_id')
            .where(`us.email = '${email}'`)
            .getRawOne();
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

    public async createLinkUserWithEnterprise(data: ICreateLinkUserWithEnterpriseDTO): Promise<EnterpriseUser> {
        const linkUserWithEnterprise = this.ormRepository.getRepository(EnterpriseUser).create(data);
        await this.ormRepository.getRepository(EnterpriseUser).save(linkUserWithEnterprise);
        return linkUserWithEnterprise;
    }

    public async deleteLinkUserWithEnterprise(enterpriseUser: EnterpriseUser, data: ICreateLinkUserWithEnterpriseDTO): Promise<EnterpriseUser> {
        const unlinkUserEnterprise = this.ormRepository.getRepository(EnterpriseUser).merge(enterpriseUser, {is_active: false, deleted_at: new Date()});
        await this.ormRepository.getRepository(EnterpriseUser).save(unlinkUserEnterprise);
        return unlinkUserEnterprise;
    }

    public async findAllLinkEnterprisesUsers(filters: IFiltersGetAllEnterprisesUsersDTO, request: Request): Promise<User[] | undefined> {
        const query = this.ormRepository.getRepository(EnterpriseUser).createQueryBuilder('eu')
            .select('us')
            .innerJoin('users', 'us', 'us.user_id = eu.user_id')
            .where(`1 = 1`);

        if (filters.name) {
            query.andWhere(`us.name like '%${filters.name}%'`);
        }

        if (filters.email) {
            query.andWhere(`us.email like '%${filters.email}%'`);
        }

        if (filters.birth_at_begin) {
            query.andWhere(`us.birth_at >= '${format(filters.birth_at_begin, 'yyyy-MM-dd')}'`);
        }

        if (filters.birth_at_end) {
            query.andWhere(`us.birth_at <= '${format(filters.birth_at_end, 'yyyy-MM-dd')}'`);
        }

        if (filters.is_active !== undefined) {
            query.andWhere(`us.is_active = ${(!!filters.is_active)}`);
        }

        if (filters.city_id) {
            query.andWhere(`us.city_id = ${filters.city_id}`);
        }

        if (filters.state_id) {
            query.innerJoin('cities', 'ci', `ci.city_id = us.city_id AND ci.state_id = ${filters.state_id}`);
        }

        if (filters.schooling_id) {
            query.andWhere(`us.schooling_id = ${filters.schooling_id}`);
        }

        if (filters.profile_id) {
            query.andWhere(`eu.profile_id = ${filters.profile_id}`);
        }

        if ((request.user.profile_id === 2 || request.user.profile_id === 3) || filters.enterprise_id) {
            query.andWhere(`eu.enterprise_id = '${filters.enterprise_id ? filters.enterprise_id : request.user.enterprise_id}'`);
        }

        return await query.getRawMany();
    }

    public async findLinkUserWithEnterprise(data: ICreateLinkUserWithEnterpriseDTO): Promise<EnterpriseUser | undefined> {
        return await this.ormRepository.getRepository(EnterpriseUser).findOne({
            enterprise_id: data.enterprise_id,
            user_id: data.user_id,
            profile_id: data.profile_id
        });
    }
}

export default EnterpriseRepository;
