import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IEnterprisesRepository from "../repositories/IEnterprisesRepository";

import Users from "../../users/infra/typeorm/entities/Users";

import {IFiltersGetAllEnterprisesUsersDTO} from "../dtos/IEnterpriseDTO";
import {Request} from "express";

@injectable()
export class GetAllLinkEnterprisesUsers {
    constructor(
        @inject(`EnterprisesRepository`)
        private enterprisesRepository: IEnterprisesRepository,
    ) {}

    public async execute(filters: IFiltersGetAllEnterprisesUsersDTO, request: Request): Promise<Users[] | undefined> {
        const linkEnterprisesUsers = await this.enterprisesRepository.findAllLinkEnterprisesUsers(filters, request);

        if (!linkEnterprisesUsers) {
            throw new AppError('No enterprise found', 404);
        }

        return linkEnterprisesUsers;
    }
}
