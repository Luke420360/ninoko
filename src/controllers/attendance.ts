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

@Controller('/attendance')
class AttendanceController {
    @Route('get', '/get/all')
    @MongoGetAll(Attendance)
    getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }
    @Route('get', '/get/:id')
    @MongoGet(Attendance)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @MongoCreate(Attendance)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/query')
    @MongoQuery(Attendance)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoQuery);
    }
    @Route('patch', '/update/:id')
    @MongoUpdate(Attendance)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @MongoDelete(Attendance)
    delete(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: 'Deleted' });
    }
}

export default AttendanceController;
