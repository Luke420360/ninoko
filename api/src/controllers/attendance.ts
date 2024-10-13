import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { MongoGetAll } from '../decorators/mongoose/getAll';
import { Attendance } from '../models/attendance';
import { MongoGet } from '../decorators/mongoose/get';
import { MongoCreate } from '../decorators/mongoose/create';
import { MongoQuery } from '../decorators/mongoose/query';
import { MongoUpdate } from '../decorators/mongoose/update';
import { MongoDelete } from '../decorators/mongoose/delete';
import { Authorize } from '../decorators/authorize';
import permissions from '../common/permissions';

@Controller('/attendance')
class AttendanceController {
    @Route('get', '/get/all')
    @Authorize(permissions['attendance'].read)
    @MongoGetAll(Attendance)
    getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }
    @Route('get', '/get/:id')
    @Authorize(permissions['attendance'].read)
    @MongoGet(Attendance)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @Authorize(permissions['attendance'].create)
    @MongoCreate(Attendance)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/query')
    @Authorize(permissions['attendance'].read)
    @MongoQuery(Attendance)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoQuery);
    }
    @Route('patch', '/update/:id')
    @Authorize(permissions['attendance'].update)
    @MongoUpdate(Attendance)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @Authorize(permissions['attendance'].delete)
    @MongoDelete(Attendance)
    delete(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: 'Deleted' });
    }
}

export default AttendanceController;
