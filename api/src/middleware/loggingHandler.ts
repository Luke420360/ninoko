import { Request, Response, NextFunction } from 'express';

export function loggingHandler(req: Request, res: Response, next: NextFunction) {
    logging.info(`INCOMING - METHOD: [${req.method}] - URL: [${req.url}] - PATH: [${req.path}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.info(
            `OUTGOING - METHOD: [${req.method}] - URL: [${req.url}] - PATH: [${req.path}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
        );
    });

    next();
}
