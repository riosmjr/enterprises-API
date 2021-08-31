export interface ICreateEnterpriseDTO {
    name: string;
    occupation_area: string;
    description: string;
    director: string;
    founded_at: Date;
    is_active: boolean;
}

export interface IUpdateEnterpriseDTO {
    name?: string;
    occupation_area?: string;
    description?: string;
    director?: string;
    founded_at?: Date;
    is_active?: boolean;
}

export interface IFiltersGetAllEnterprisesDTO {
    name?: string;
    occupation_area?: string;
    description?: string;
    director?: string;
    founded_at_begin?: Date;
    founded_at_end?: Date;
    is_active?: boolean;
}

export interface ICreateLinkUserWithEnterpriseDTO {
    user_id: uuid;
    enterprise_id: uuid;
    profile_id: interger;
}