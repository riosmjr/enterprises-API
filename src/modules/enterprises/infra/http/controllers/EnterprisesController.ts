import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {
    CreateEnterprisesService,
    GetDirectorByEmailService,
    UpdateEnterprisesService,
    GetEnterpriseByIdService,
    DeleteEnterpriseService,
    GetAllEnterprisesService, DeleteLinkUserWithEnterpriseService, GetAllLinkEnterprisesUsers,
} from "../../../services";
import {GetUserService} from "../../../../users/services";
import AppError from "../../../../../shared/errors/AppError";
import {CreateLinkUserWithEnterpriseService} from "../../../services";
import {IFiltersGetAllEnterprisesUsersDTO} from "../../../dtos/IEnterpriseDTO";

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

        const getUser = container.resolve(GetUserService);
        const user = await getUser.execute(user_id);

        if (!user) {
            throw new AppError('User does not exist or has been deleted', 404);
        }

        if (user.profile_id === 1) {
            throw new AppError('It is not possible to perform this action for an admin user.', 404);
        }

        const getEnterprise = container.resolve(GetEnterpriseByIdService);
        const enterprise = await getEnterprise.execute(enterprise_id);

        if (!enterprise) {
            throw new AppError('Enterprise does not exist or has been deleted', 404);
        }

        if (request.user.profile_id !== 1 && enterprise_id !== request.user.enterprise_id){
            throw new AppError('User not autorization.', 404);
        }

        const createLinkUserWithEnterprise = container.resolve(CreateLinkUserWithEnterpriseService);
        const linkUserWithEnterprise = await createLinkUserWithEnterprise.execute(request.body);

        return response.json(classToClass(linkUserWithEnterprise));
    }

    public async unlinkUserEnterprise(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {enterprise_id, user_id} = request.body;

        const getUser = container.resolve(GetUserService);
        const user = await getUser.execute(user_id);

        if (!user) {
            throw new AppError('User does not exist or has been deleted', 404);
        }

        const getEnterprise = container.resolve(GetEnterpriseByIdService);
        const enterprise = await getEnterprise.execute(enterprise_id);

        if (!enterprise) {
            throw new AppError('Enterprise does not exist or has been deleted', 404);
        }

        if (request.user.profile_id !== 1 && enterprise_id !== request.user.enterprise_id){
            throw new AppError('User not autorization.', 404);
        }

        const deleteLinkUserEnterprise = container.resolve(DeleteLinkUserWithEnterpriseService);
        const unlinkUserEnterprise = await deleteLinkUserEnterprise.execute(request.body);

        return response.json(classToClass(unlinkUserEnterprise));
    }

    public async getAllLinkEnterprisesUsers(request: Request, response: Response): Promise<Response> {
        const params = request.query;

        const getLinkEnterprisesUsers = container.resolve(GetAllLinkEnterprisesUsers);
        const linkEnterpriseUser = await getLinkEnterprisesUsers.execute(params, request);

        return response.json(classToClass(linkEnterpriseUser));
    }
}