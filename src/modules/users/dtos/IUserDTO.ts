export interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    birth_at: Date;
    is_active?: boolean;
    city_id: integer;
    schooling_id: integer;
}

export interface IUpdateUserDTO {
    name?: string;
    email?: string;
    password?: string;
    birth_at?: Date;
    is_active?: boolean;
    city_id?: integer;
    schooling_id?: integer;
}

export interface IFiltersGetAllUsersDTO {
    name?: string;
    email?: string;
    birth_at_begin?: Date;
    birth_at_end?: Date;
    is_active?: boolean;
    city_id?: integer;
    state_id?: integer;
    schooling_id?: integer;
    profile_id?: integer;
}

export interface IGetUserByEmailDTO {
    user_id: string;
    name: string;
    email?: string;
    password?: string;
    profile_id: integer;
}