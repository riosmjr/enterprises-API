import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IEnterprisesRepository from "../repositories/IEnterprisesRepository";

import Enterprise from "../infra/typeorm/entities/Enterprises";

@injectable()
export class GetEnterpriseByIdService {
    constructor(
        @inject(`EnterprisesRepository`)
        private enterprisesRepository: IEnterprisesRepository,
    ) {}

    public async execute(enterprise_id: string): Promise<Enterprise> {
        const enterprise = await this.enterprisesRepository.findById(enterprise_id);

        if (!enterprise) {
            throw new AppError('Enterprise does not exist or has been deleted', 404);
        }

        return enterprise;
    }
}
