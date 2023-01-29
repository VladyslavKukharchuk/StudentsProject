import { Request, Response, NextFunction } from 'express';
import { BadRequest, UnauthorizedError } from '../exceptions/ApiError';


export function errorHandlerHttp(err: Error, req: Request, res: Response, next: NextFunction) {
   if (res.headersSent) {
      return next(err);
   }

   if (err instanceof BadRequest) {
      res.status(err.httpCode).send({ message: err.message });
      return;
   }

   if (err instanceof UnauthorizedError) {
      res.status(err.httpCode).send({ message: err.message });
      return;
   }

   console.warn('httpError', '', {
      message: `${err.message}`,
      action: `${req.method} : ${req.url}`,
      body: {
         ...req.body,
      },
      err,
   });

   res.status(500).send({ message: 'Something went wrong on the server' });
}

export function errorHandlerWs(err: any, ws: any) {
   if (err instanceof BadRequest) {
      ws.send(JSON.stringify({ message: err.message }));
      return;
   }

   if (err instanceof UnauthorizedError) {
      ws.send(JSON.stringify({ message: err.message }));
      return;
   }

   console.warn('WsError', '', {
      message: `${err.message}`,
      err,
   });

   ws.send(JSON.stringify({ message: 'Something went wrong on the server' }));
   return;
}
