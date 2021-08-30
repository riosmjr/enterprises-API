import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {
    CreateEnterprisesService,
    GetDirectorByEmailService,
    UpdateEnterprisesService,
    GetEnterpriseByIdService,
    DeleteEnterpriceService
} from "../../../services";
import {DeleteUserService} from "../../../../users/services";

export default class EnterprisesController {

    public async getEnterpriseById(request: Request, response: Response): Promise<Response> {
        const { enterprise_id } = request.params;

        const getEnterprise = container.resolve(GetEnterpriseByIdService);
        const enterprise = await getEnterprise.execute(enterprise_id);

        return response.json(classToClass(enterprise));
    }

    public async createEnterprise(
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

    public async updateEnterprise(
        request: Request,
        response: Response,
    ): Promise<Response> {

        const {enterprise_id} = request.params;

        if (request.body?.director) {
            const {director} = request.body;

            const getDirector = container.resolve(GetDirectorByEmailService);
            const dataDirector = await getDirector.execute(director);

            request.body.director = dataDirector.name;
        }

        const updateEnterprise = container.resolve(UpdateEnterprisesService);
        const enterprise = await updateEnterprise.execute(request.body, enterprise_id);

        return response.json(classToClass(enterprise));
    }

    public async deleteEnterprise(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { enterprise_id } = request.params;

        const deleteEnterprise = container.resolve(DeleteEnterpriceService);
        const enterprise = await deleteEnterprise.execute(enterprise_id);

        return response.json(classToClass(enterprise));
    }
}