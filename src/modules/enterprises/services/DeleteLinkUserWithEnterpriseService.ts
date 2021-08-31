import { injectable, inject } from 'tsyringe';

import IEnterprisesRepository from "../repositories/IEnterprisesRepository";

import {ICreateLinkUserWithEnterpriseDTO} from "../dtos/IEnterpriseDTO";

import EnterpriseUser from "../infra/typeorm/entities/EnterpriseUser";

import AppError from "../../../shared/errors/AppError";

@injectable()
export class DeleteLinkUserWithEnterpriseService {
    constructor(
        @inject(`EnterprisesRepository`)
        private enterprisesRepository: IEnterprisesRepository,
    ) {}

    public async execute(data: ICreateLinkUserWithEnterpriseDTO): Promise<EnterpriseUser> {

        const linkUserEnterprise = await this.enterprisesRepository.findLinkUserWithEnterprise(data);

        if (!linkUserEnterprise) {
            throw new AppError('Link not found', 404);
        }

        return await this.enterprisesRepository.deleteLinkUserWithEnterprise(linkUserEnterprise, data);
    }
}
