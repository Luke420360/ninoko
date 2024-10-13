import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { MongoGetAll } from '../decorators/mongoose/getAll';
import { Department } from '../models/departments';
import { MongoGet } from '../decorators/mongoose/get';
import { MongoCreate } from '../decorators/mongoose/create';
import { MongoQuery } from '../decorators/mongoose/query';
import { MongoUpdate } from '../decorators/mongoose/update';
import { MongoDelete } from '../decorators/mongoose/delete';
import { Authorize } from '../decorators/authorize';
import permissions from '../common/permissions';

@Controller('/departments')
class DepartmentsController {
    @Route('get', '/get/all')
    @Authorize(permissions['departments'].read)
    @MongoGetAll(Department)
    getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }
    @Route('get', '/get/:id')
    @Authorize(permissions['departments'].read)
    @MongoGet(Department)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @Authorize(permissions['departments'].create)
    @MongoCreate(Department)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/query')
    @Authorize(permissions['departments'].read)
    @MongoQuery(Department)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoQuery);
    }
    @Route('patch', '/update/:id')
    @Authorize(permissions['departments'].update)
    @MongoUpdate(Department)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @Authorize(permissions['departments'].delete)
    @MongoDelete(Department)
    delete(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: 'Deleted' });
    }
}

export default DepartmentsController;
