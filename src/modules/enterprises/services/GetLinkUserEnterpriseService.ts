import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IEnterprisesRepository from "../repositories/IEnterprisesRepository";

import {ICreateLinkUserWithEnterpriseDTO} from "../dtos/IEnterpriseDTO";

import EnterpriseUser from "../infra/typeorm/entities/EnterpriseUser";

@injectable()
export class GetLinkUserEnterpriseService {
    constructor(
        @inject(`EnterprisesRepository`)
        private enterprisesRepository: IEnterprisesRepository,
    ) {}

    public async execute(data: ICreateLinkUserWithEnterpriseDTO): Promise<EnterpriseUser> {
        const linkUserEnterprise = await this.enterprisesRepository.findLinkUserWithEnterprise(data);

        if (!linkUserEnterprise) {
            throw new AppError('Link not found', 404);
        }

        return linkUserEnterprise;
    }
}
