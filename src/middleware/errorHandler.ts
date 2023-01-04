import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/ApiError';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
   if (res.headersSent) {
      return next(err);
   }

   if (err instanceof ApiError) {
      res.status(err.status).send({ message: err.message });
      return;
   }

   console.warn('error', '', {
      message: 'Error Handler',
      action: `${req.method} : ${req.url}`,
      body: {
         ...req.body,
      },
      err,
   });

   res.status(500).send({message: 'Something went wrong on the server'});
}

function errorHandlerWS(err: Error) {
   console.warn('error', '', {
      message: 'Error Handler',
      err,
   });
}

export { errorHandler, errorHandlerWS};
