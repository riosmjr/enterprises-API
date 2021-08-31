import { injectable, inject } from 'tsyringe';

import IEnterprisesRepository from "../repositories/IEnterprisesRepository";

import Enterprise from "../infra/typeorm/entities/Enterprises";

import AppError from "../../../shared/errors/AppError";

@injectable()
export class DeleteEnterpriseService {
    constructor(
        @inject(`EnterprisesRepository`)
        private enterprisesRepository: IEnterprisesRepository,
    ) {}

    public async execute(enterprise_id: string): Promise<Enterprise> {

        const enterprise = await this.enterprisesRepository.findById(enterprise_id);

        if (!enterprise) {
            throw new AppError('Enterprise does not exist or has been deleted', 404);
        }

        return await this.enterprisesRepository.deleteEnterprise(enterprise);
    }
}
