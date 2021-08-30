import { injectable, inject } from 'tsyringe';

import IEnterprisesRepository from "../repositories/IEnterprisesRepository";

import Enterprise from "../infra/typeorm/entities/Enterprises";

import {ICreateEnterpriseDTO} from "../dtos/IEnterpriseDTO";

@injectable()
export class CreateEnterprisesService {
    constructor(
        @inject(`EnterprisesRepository`)
        private enterprisesRepository: IEnterprisesRepository,
    ) {}

    public async execute(data: ICreateEnterpriseDTO): Promise<Enterprise> {
        return await this.enterprisesRepository.createEnterprise(data);
    }
}
