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