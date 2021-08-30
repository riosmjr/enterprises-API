import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IEnterprisesRepository from "../repositories/IEnterprisesRepository";

import User from "../../users/infra/typeorm/entities/Users";

@injectable()
export class GetDirectorByEmailService {
    constructor(
        @inject(`EnterprisesRepository`)
        private enterprisesRepository: IEnterprisesRepository,
    ) {}

    public async execute(email: string): Promise<User> {
        const director = await this.enterprisesRepository.findDirectorByEmail(email);

        console.log(director)

        if (!director || director.profile_id !== 3) {
            throw new AppError('No director profile was found with this e-mail', 404);
        }

        return director;
    }
}
