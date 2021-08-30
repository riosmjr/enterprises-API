declare namespace Express {
    export interface Request {
        user: {
            user_id: string;
            profile_id: number;
        };
    }
}
