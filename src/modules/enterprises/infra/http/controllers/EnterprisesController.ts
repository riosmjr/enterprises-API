import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {
    CreateEnterprisesService,
    GetDirectorByEmailService,
    UpdateEnterprisesService,
    GetEnterpriseByIdService,
    DeleteEnterpriseService,
    GetAllEnterprisesService,
} from "../../../services";
import {GetUserByIdService} from "../../../../users/services";
import AppError from "../../../../../shared/errors/AppError";
import {CreateLinkUserWithEnterpriseService} from "../../../services/CreateLinkUserWithEnterpriseService";

export default class EnterprisesController {

    public async getEnterpriseById(request: Request, response: Response): Promise<Response> {
        const { enterprise_id } = request.params;

        const getEnterprise = container.resolve(GetEnterpriseByIdService);
        const enterprise = await getEnterprise.execute(enterprise_id);

        return response.json(classToClass(enterprise));
    }

    public async getAllEnterprises(request: Request, response: Response): Promise<Response> {
        const params  = request.query;

        const getEnterprises = container.resolve(GetAllEnterprisesService);
        const enterprise = await getEnterprises.execute(params);

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

        const deleteEnterprise = container.resolve(DeleteEnterpriseService);
        const enterprise = await deleteEnterprise.execute(enterprise_id);

        return response.json(classToClass(enterprise));
    }

    public async linkUserWithEnterprise(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {enterprise_id, user_id} = request.body;

        const getUser = container.resolve(GetUserByIdService);
        const user = await getUser.execute(user_id);

        if (!user) {
            throw new AppError('User does not exist or has been deleted', 404);
        }

        const getEnterprise = container.resolve(GetEnterpriseByIdService);
        const enterprise = await getEnterprise.execute(enterprise_id);

        if (!enterprise) {
            throw new AppError('Enterprise does not exist or has been deleted', 404);
        }

        const createLinkUserWithEnterprise = container.resolve(CreateLinkUserWithEnterpriseService);
        const linkUserWithEnterprise = await createLinkUserWithEnterprise.execute(request.body);

        return response.json(classToClass(linkUserWithEnterprise));
    }
}