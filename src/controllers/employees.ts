import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { MongoGetAll } from '../decorators/mongoose/getAll';
import { Employee } from '../models/employees';
import { MongoGet } from '../decorators/mongoose/get';
import { MongoCreate } from '../decorators/mongoose/create';
import { MongoQuery } from '../decorators/mongoose/query';
import { MongoUpdate } from '../decorators/mongoose/update';
import { MongoDelete } from '../decorators/mongoose/delete';
import { Authorize } from '../decorators/authorize';
import permissions from '../common/permissions';

@Controller('/employees')
class EmployeeController {
    @Route('get', '/get/all')
    @Authorize(permissions['employees'].read)
    @MongoGetAll(Employee)
    getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }
    @Route('get', '/get/:id')
    @Authorize(permissions['employees'].read)
    @MongoGet(Employee)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @Authorize(permissions['employees'].create)
    @MongoCreate(Employee)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/query')
    @Authorize(permissions['employees'].read)
    @MongoQuery(Employee)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoQuery);
    }
    @Route('patch', '/update/:id')
    @Authorize(permissions['employees'].update)
    @MongoUpdate(Employee)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @Authorize(permissions['employees'].delete)
    @MongoDelete(Employee)
    delete(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: 'Deleted' });
    }
}

export default EmployeeController;
