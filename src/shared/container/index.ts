import { container } from 'tsyringe';

import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UserRepository';

import IEnterprisesRepository from '../../modules/enterprises/repositories/IEnterprisesRepository';
import EnterprisesRepository from '../../modules/enterprises/infra/typeorm/repositories/EnterpriseRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IEnterprisesRepository>(
    'EnterprisesRepository',
    EnterprisesRepository,
);