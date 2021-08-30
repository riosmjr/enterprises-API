import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {CreateEnterprisesService, GetDirectorByEmailService} from "../../../services";
import AppError from "../../../../../shared/errors/AppError";

export default class EnterprisesController {
    public async createEnterprises(
        request: Request,
        response: Response,
    ): Promise<Response> {
            const {director} = request.body;

            const getDirector = container.resolve(GetDirectorByEmailService);
            const dataDirector = await getDirector.execute(director);

            request.body.director = dataDirector.name;

            const newEnterprise = container.resolve(CreateEnterprisesService);
            const enterprise = await newEnterprise.execute(request.body);

            return response.json(classToClass(enterprise));
    }
}