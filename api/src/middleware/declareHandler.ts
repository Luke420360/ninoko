import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Document } from 'mongoose';
import { User } from '../models/users';

export type DecodedToken = {
    userId: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
};

declare global {
    namespace Express {
        interface Request {
            user: string | typeof User | null | undefined;
            token: JwtPayload | string | undefined;
            refreshToken: string | undefined;
            mongoGet: Document | undefined;
            mongoGetAll: Document[] | undefined;
            mongoCreate: Document | undefined;
            mongoUpdate: Document | undefined;
            mongoQuery: Document[];
        }
    }
}

export function declareHandler(req: Request, res: Response, next: NextFunction) {
    req.mongoCreate = undefined;
    req.mongoGet = undefined;
    req.mongoGetAll = [];
    req.mongoUpdate = undefined;
    req.mongoQuery = [];

    next();
}
