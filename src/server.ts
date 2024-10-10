import http from 'http';
import express from 'express';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { Request, Response, NextFunction } from 'express';
import { routeNotFound } from './middleware/routeNotFound';
import { SERVER, SERVER_HOSTNAME } from './config/config';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    console.info('--------------------------');
    console.info('INITIALIZING API...');
    console.info('--------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    console.info('--------------------------');
    console.info('LOGGING & CONFIGURATION...');
    console.info('--------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);

    console.info('--------------------------');
    console.info('DEFINE CONTROLLER ROUTING...');
    console.info('--------------------------');
    application.get('/main/healthcheck', (req: Request, res: Response, next) => {
        res.status(200).json({ status: 'UP' });
    });

    console.info('--------------------------');
    console.info('CHECKING ROUTE...');
    console.info('--------------------------');
    application.use(routeNotFound);

    console.info('--------------------------');
    console.info('STARTING SERVER...');
    console.info('--------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        console.info('--------------------------');
        console.info(`Server is running on ${SERVER_HOSTNAME}:${SERVER.SERVER_PORT}`);
        console.info('--------------------------');
    });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
