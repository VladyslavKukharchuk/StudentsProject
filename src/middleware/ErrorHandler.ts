import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/ApiError';

class ErrorHandler {
   static http(err: Error, req: Request, res: Response, next: NextFunction) {
      if (res.headersSent) {
         return next(err);
      }

      if (err instanceof ApiError) {
         res.status(err.status).send({ message: err.message });
         return;
      }

      console.warn('httpError', '', {
         message: 'Error Handler',
         action: `${req.method} : ${req.url}`,
         body: {
            ...req.body,
         },
         err,
      });

      res.status(500).send({ message: 'Something went wrong on the server' });
   }

   static ws(err: Error, next: NextFunction) {
      if (err instanceof ApiError) {
         next({ message: err.message });
         return;
      }

      console.warn('WsError', '', {
         message: 'Error Handler',
         err,
      });

      next({ message: 'Something went wrong on the server' });
   }
}

export default ErrorHandler;
