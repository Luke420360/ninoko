import { Request, Response, NextFunction } from 'express';
import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '../../../models/roles';
import { Token } from '../../../models/tokens';

export function MongoRegister(model: Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { email, username, password, stayLoggedIn } = req.body;
                const user = await model.findOne({ email });
                if (user) return res.status(401).json({ error: 'User already exists' });

                const salt = await bcrypt.genSalt(10);
                const pepper = process.env.PEPPER || '';
                const hashedPassword = await bcrypt.hash(password + pepper, salt);
                const role_id = await Role.findOne({ name: 'user' });
                logging.info('role_id:', role_id);
                const newUser = new model({
                    _id: new mongoose.Types.ObjectId(),
                    email,
                    username,
                    password: hashedPassword,
                    salt,
                    role_id
                });

                newUser.save();
                req.user = newUser;

                //access-token
                const token = jwt.sign(
                    { userId: newUser._id, email: newUser.email, role: newUser.role_id }, // Payload
                    process.env.JWT_SECRET!, // Secret Key
                    { expiresIn: process.env.JWT_EXPIRES_IN } // Ablaufzeit
                );
                req.token = token;

                //refresh-token
                if (stayLoggedIn) {
                    const refreshToken = jwt.sign(
                        { userId: newUser._id, email: newUser.email, role: newUser.role_id }, // Payload
                        process.env.REFRESH_JWT_SECRET!, // Secret Key
                        { expiresIn: process.env.REFRESH_JWT_EXPIRES_IN } // Ablaufzeit
                    );

                    req.refreshToken = refreshToken;
                }
            } catch (error) {
                logging.error(error);
                return res.status(500).json(error);
            }
            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}

export function MongoLogin(model: Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { email, password, stayLoggedIn } = req.body;
                const user = await model.findOne({ email });
                if (!user) return res.status(404).json({ error: 'User not found' });

                const pepper = process.env.PEPPER || '';
                const hashedPassword = await bcrypt.hash(password + pepper, user.salt);
                if (hashedPassword !== user.password) return res.status(401).json({ error: 'Invalid password' });

                // access-token
                const token = jwt.sign(
                    { userId: user._id, email: user.email, role: user.role_id }, // Payload
                    process.env.JWT_SECRET!, // Secret Key
                    { expiresIn: process.env.JWT_EXPIRES_IN } // Ablaufzeit
                );

                req.token = token;

                // refresh-token
                if (stayLoggedIn) {
                    const refreshToken = jwt.sign(
                        { userId: user._id, email: user.email, role: user.role_id }, // Payload
                        process.env.REFRESH_JWT_SECRET!, // Secret Key
                        { expiresIn: process.env.REFRESH_JWT_EXPIRES_IN } // Ablaufzeit
                    );

                    await Token.create({
                        user_id: user._id,
                        token: refreshToken,
                        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 Tage Gültigkeit
                    });

                    req.refreshToken = refreshToken;
                }
            } catch (error) {
                logging.error(error);
                return res.status(500).json(error);
            }
            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}

export function MongoRefreshToken(model: Model<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            try {
                const { refreshToken } = req.body;
                if (!refreshToken) return res.status(401).json({ error: 'No refresh token provided' });
                const token = await Token.findOne({ token: refreshToken });
                if (!token) return res.status(401).json({ error: 'Invalid token' });

                const user = await model.findById(token.user_id);
                if (!user) return res.status(404).json({ error: 'User not found' });

                // access-token
                const newToken = jwt.sign(
                    { userId: user._id, email: user.email, role: user.role_id }, // Payload
                    process.env.JWT_SECRET!, // Secret Key
                    { expiresIn: process.env.JWT_EXPIRES_IN } // Ablaufzeit
                );

                req.token = newToken;
            } catch (error) {
                logging.error(error);
                return res.status(500).json(error);
            }
            return originalMethod.call(this, req, res, next);
        };

        return descriptor;
    };
}
