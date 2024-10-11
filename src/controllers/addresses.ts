import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { MongoGetAll } from '../decorators/mongoose/getAll';
import { Address } from '../models/addresses';
import { MongoGet } from '../decorators/mongoose/get';
import { MongoCreate } from '../decorators/mongoose/create';
import { MongoQuery } from '../decorators/mongoose/query';
import { MongoUpdate } from '../decorators/mongoose/update';
import { MongoDelete } from '../decorators/mongoose/delete';

@Controller('/addresses')
class AddressesController {
    @Route('get', '/get/all')
    @MongoGetAll(Address)
    getAll(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGetAll);
    }
    @Route('get', '/get/:id')
    @MongoGet(Address)
    get(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoGet);
    }
    @Route('post', '/create')
    @MongoCreate(Address)
    create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoCreate);
    }
    @Route('post', '/query')
    @MongoQuery(Address)
    query(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json(req.mongoQuery);
    }
    @Route('patch', '/update/:id')
    @MongoUpdate(Address)
    update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json(req.mongoUpdate);
    }
    @Route('delete', '/delete/:id')
    @MongoDelete(Address)
    delete(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: 'Deleted' });
    }
}

export default AddressesController;
