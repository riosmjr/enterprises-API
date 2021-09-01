import Enterprise from '../infra/typeorm/entities/Enterprises';
import {
    ICreateEnterpriseDTO,
    ICreateLinkUserWithEnterpriseDTO,
    IFiltersGetAllEnterprisesDTO,
    IFiltersGetAllEnterprisesUsersDTO,
    IUpdateEnterpriseDTO
} from "../dtos/IEnterpriseDTO";
import {IGetUserDTO} from "../../users/dtos/IUserDTO";
import EnterpriseUser from "../infra/typeorm/entities/EnterpriseUser";
import Users from "../../users/infra/typeorm/entities/Users";
import {Request} from "express";

export default interface IEnterprisesRepository {
    findById(enterprise_id: string): Promise<Enterprise | undefined>;
    findAll(filters: IFiltersGetAllEnterprisesDTO): Promise<Enterprise[] | undefined>;
    findDirectorByEmail(email: string): Promise<IGetUserDTO | undefined>;
    createEnterprise(data: ICreateEnterpriseDTO): Promise<Enterprise>;
    updateEnterprise(enterprise: Enterprise, data: IUpdateEnterpriseDTO): Promise<Enterprise>;
    deleteEnterprise(enterprise: Enterprise): Promise<Enterprise>;
    createLinkUserWithEnterprise(data: ICreateLinkUserWithEnterpriseDTO): Promise<EnterpriseUser>;
    deleteLinkUserWithEnterprise(enterpriseUser: EnterpriseUser, data: ICreateLinkUserWithEnterpriseDTO): Promise<EnterpriseUser>;
    findLinkUserWithEnterprise(data: ICreateLinkUserWithEnterpriseDTO): Promise<EnterpriseUser | undefined>;
    findAllLinkEnterprisesUsers(filters: IFiltersGetAllEnterprisesUsersDTO, request: Request): Promise<Users[] | undefined>
}