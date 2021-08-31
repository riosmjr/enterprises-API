import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IEnterprisesRepository from "../repositories/IEnterprisesRepository";

import {IGetUserByEmailDTO} from "../../users/dtos/IUserDTO";

@injectable()
export class GetDirectorByEmailService {
    constructor(
        @inject(`EnterprisesRepository`)
        private enterprisesRepository: IEnterprisesRepository,
    ) {}

    public async execute(email: string): Promise<IGetUserByEmailDTO> {
        const director = await this.enterprisesRepository.findDirectorByEmail(email);

        if (!director || director.profile_id !== 3) {
            throw new AppError('No director profile was found with this e-mail', 404);
        }

        return director;
    }
}
