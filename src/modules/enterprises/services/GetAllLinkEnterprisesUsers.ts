import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IEnterprisesRepository from "../repositories/IEnterprisesRepository";

import {IFiltersGetAllUsersDTO} from "../../users/dtos/IUserDTO";

import Users from "../../users/infra/typeorm/entities/Users";

@injectable()
export class GetAllLinkEnterprisesUsers {
    constructor(
        @inject(`EnterprisesRepository`)
        private enterprisesRepository: IEnterprisesRepository,
    ) {}

    public async execute(filters: IFiltersGetAllUsersDTO, enterprise_id: string): Promise<Users[] | undefined> {
        const linkEnterprisesUsers = await this.enterprisesRepository.findAllLinkEnterprisesUsers(filters, enterprise_id);

        if (!linkEnterprisesUsers) {
            throw new AppError('No enterprise found', 404);
        }

        return linkEnterprisesUsers;
    }
}
