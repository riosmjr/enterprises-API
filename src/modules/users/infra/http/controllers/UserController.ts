import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import {GetUserByIdService} from "../../../services";

export default class UserController {
    public async getUserById(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params;

        const getUser = container.resolve(GetUserByIdService);
        const user = await getUser.execute(user_id);

        return response.json(classToClass(user));
    }
}