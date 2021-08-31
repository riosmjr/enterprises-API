import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IEnterprisesRepository from "../repositories/IEnterprisesRepository";

import Enterprise from "../infra/typeorm/entities/Enterprises";

import {IFiltersGetAllEnterprisesDTO} from "../dtos/IEnterpriseDTO";

@injectable()
export class GetAllEnterprisesService {
    constructor(
        @inject(`EnterprisesRepository`)
        private enterprisesRepository: IEnterprisesRepository,
    ) {}

    public async execute(filters: IFiltersGetAllEnterprisesDTO): Promise<Enterprise[] | undefined> {
        const enterprises = await this.enterprisesRepository.findAll(filters);

        if (!enterprises) {
            throw new AppError('No enterprise found', 404);
        }

        return enterprises;
    }
}
