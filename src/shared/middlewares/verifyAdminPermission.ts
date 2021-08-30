import {Request, Response, NextFunction} from 'express';

module.exports = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user.profile_id !== 1) {
            return res.status(401).send({error: 'User not autorization, administrator permission required.'});
        }

        return next();
    } catch (e) {
        return res.status(401).send({error: 'Unexpected error'});
    }
}