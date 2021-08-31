import { injectable, inject } from 'tsyringe';

import IEnterprisesRepository from "../repositories/IEnterprisesRepository";

import {ICreateLinkUserWithEnterpriseDTO} from "../dtos/IEnterpriseDTO";

import EnterpriseUser from "../infra/typeorm/entities/EnterpriseUser";

@injectable()
export class CreateLinkUserWithEnterpriseService {
    constructor(
        @inject(`EnterprisesRepository`)
        private enterprisesRepository: IEnterprisesRepository,
    ) {}

    public async execute(data: ICreateLinkUserWithEnterpriseDTO): Promise<EnterpriseUser> {
        return await this.enterprisesRepository.createLinkUserWithEnterprise(data);
    }
}
