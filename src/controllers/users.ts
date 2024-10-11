import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { MongoGetAll } from '../decorators/mongoose/getAll';
import { User } from '../models/users';
import { MongoGet } from '../decorators/mongoose/get';
import { MongoCreate } from '../decorators/mongoose/create';
import { MongoQuery } from '../decorators/mongoose/query';
import { MongoUpdate } from '../decorators/mongoose/update';
import { MongoDelete } from '../decorators/mongoose/delete';

@Controller('/users')
class UsersController {
    @Route('get', '/get/all')
    @MongoGetAll(User)
    getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }
    @Route('get', '/get/:id')
    @MongoGet(User)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @MongoCreate(User)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/query')
    @MongoQuery(User)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoQuery);
    }
    @Route('patch', '/update/:id')
    @MongoUpdate(User)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @MongoDelete(User)
    delete(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: 'Deleted' });
    }
}

export default UsersController;
