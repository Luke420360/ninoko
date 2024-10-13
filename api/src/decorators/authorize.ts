import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { Role } from '../models/roles';
import { Permission } from '../models/permissions';
import { DecodedToken } from '../middleware/declareHandler';
import jwt from 'jsonwebtoken';

export function Authorize(permission: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { token } = req;
                if (!token) return res.status(401).json({ error: 'no token' });
                const decodedToken = jwt.verify(token.toString(), process.env.JWT_SECRET!) as DecodedToken;
                const role = await Role.findOne({ _id: decodedToken.role });
                if (!role) return res.status(401).json({ error: 'no role' });
                const { permissions: PermissionIds } = role;
                const searchedPermission = await Permission.findOne({ name: permission });

                if (!searchedPermission) return res.status(500).json({ error: 'Internal server Erro during authorization!' });
                if (!PermissionIds.includes(searchedPermission.id)) {
                    return res.status(403).json({ error: 'access denied!' });
                }
            } catch (error) {
                logging.error('Authorize-Error: ', error);

                return res.status(403).json({ error: 'denied!' });
            }

            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
