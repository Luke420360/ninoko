import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/users';

export async function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Zugriff verweigert. Kein Token vorhanden.' });
    }
    req.token = token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        let user: typeof User | null;
        if (typeof decoded !== 'string') {
            const { userId } = decoded as jwt.JwtPayload;
            user = await User.findOne({ _id: userId });
            req.user = user;
        } else {
            return res.status(403).json({ message: 'Ungültiges Token' });
        }

        next();
    } catch (err) {
        return res.status(403).json({ message: 'Ungültiges Token' });
    }
}
