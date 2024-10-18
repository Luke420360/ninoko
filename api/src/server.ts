import './config/logging';
import http from 'http';
import express from 'express';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import mongoose from 'mongoose';
import { routeNotFound } from './middleware/routeNotFound';
import { mongo, SERVER, SERVER_HOSTNAME } from './config/config';
import 'reflect-metadata';
import { defineRoutes } from './modules/routes';
import MainController from './controllers/main';
import { declareHandler } from './middleware/declareHandler';
import UsersController from './controllers/users';
import { initializeDefaultData } from './db/initializeDefaultData';
import RolesController from './controllers/roles';
import EmployeeController from './controllers/employees';
import AddressesController from './controllers/addresses';
import AttendanceController from './controllers/attendance';
import DepartmentsController from './controllers/departments';
import AuthController from './controllers/auth';
import CompaniesController from './controllers/companies';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    logging.info('--------------------------');
    logging.info('INITIALIZING API...');
    logging.info('--------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logging.info('--------------------------');
    logging.info('CONNECT TO MONGO...');
    logging.info('--------------------------');
    try {
        const connection = await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS);
        logging.info('--------------------------');
        logging.info('CONNECTED TO MONGO', connection.version);
        logging.info('--------------------------');
        await initializeDefaultData();
    } catch (error) {
        logging.info('--------------------------');
        logging.info('UNABLE TO CONNECT!');
        logging.error(error);
        logging.info('--------------------------');
    }

    logging.info('--------------------------');
    logging.info('LOGGING & CONFIGURATION...');
    logging.info('--------------------------');
    application.use(declareHandler);
    application.use(loggingHandler);
    application.use(corsHandler);

    logging.info('--------------------------');
    logging.info('DEFINE CONTROLLER ROUTING...');
    logging.info('--------------------------');
    defineRoutes(
        [
            MainController,
            AuthController,
            UsersController,
            RolesController,
            EmployeeController,
            AddressesController,
            AttendanceController,
            DepartmentsController,
            CompaniesController
        ],
        application
    );

    logging.info('--------------------------');
    logging.info('CHECKING ROUTE...');
    logging.info('--------------------------');
    application.use(routeNotFound);

    logging.info('--------------------------');
    logging.info('STARTING SERVER...');
    logging.info('--------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.info('--------------------------');
        logging.info(`Server is running on ${SERVER_HOSTNAME}:${SERVER.SERVER_PORT}`);
        logging.info('--------------------------');
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
