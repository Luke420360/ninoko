import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { User } from '../models/users';
import { MongoUpdate } from '../decorators/mongoose/update';
import { MongoDelete } from '../decorators/mongoose/delete';
import { Validate } from '../decorators/validate';
import Joi from 'joi';
import { MongoLogin, MongoRefreshToken, MongoRegister } from '../decorators/mongoose/auth/auth';
import registerValidation from '../schemas/registerValidation';
import loginValidation from '../schemas/loginValidation';
import { authenticateJWT } from '../middleware/authenticateJWTHandler';

@Controller('/auth')
class AuthController {
    @Route('post', '/register')
    @Validate(registerValidation)
    @MongoRegister(User)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({
            access_token: req.token,
            refresh_token: req.refreshToken ? req.refreshToken : undefined
        });
    }

    @Route('post', '/login')
    @Validate(loginValidation)
    @MongoLogin(User)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({
            access_token: req.token,
            refresh_token: req.refreshToken ? req.refreshToken : undefined
        });
    }

    @Route('post', '/refresh/token')
    @MongoRefreshToken(User)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({
            access_token: req.token,
            refresh_token: req.refreshToken ? req.refreshToken : undefined
        });
    }

    @Route('patch', '/password/reset')
    @MongoUpdate(User)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoUpdate);
    }

    @Route('delete', '/delete', authenticateJWT)
    @MongoDelete(User)
    delete(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: 'Deleted' });
    }
}

export default AuthController;
