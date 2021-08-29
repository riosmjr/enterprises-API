export interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    birth_at: Date;
    is_active?: boolean;
    city_id: integer;
    schooling_id: integer;
    profile_id: integer;
}

export interface IUpdateUserDTO {
    name?: string;
    email?: string;
    password?: string;
    birth_at?: Date;
    is_active?: boolean;
    city_id?: integer;
    schooling_id?: integer;
    profile_id?: integer;
}