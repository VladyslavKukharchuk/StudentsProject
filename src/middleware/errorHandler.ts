import { Request, Response, NextFunction } from 'express';

class ApplicationError extends Error {
   constructor(message: string) {
      super(message);
      // name is set to the name of the class
      this.name = this.constructor.name;
   }
}

class ValidationError extends ApplicationError {
   public cause: any;

   constructor(message: string, cause?: any) {
      super(message);
      this.cause = cause;
   }
}

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
   if (res.headersSent) {
      return next(err);
   }

   if (err instanceof ValidationError) {
      res.status(400).send({ message: err.message, cause: err.cause });
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

   res.status(500).send('Something went wrong');
}

function errorHandlerWS(err: Error, socket?: any) {
   if (err instanceof ValidationError) {
      console.log('ValidationError');
      socket.emit('error', { message: err.message, cause: err.cause });
      return;
   }

   if (socket) {
      socket.emit('error', 'An error occurred on the server');
   }

   console.warn('error', '', {
      message: 'Error Handler',
      err,
   });
}

export { errorHandler, errorHandlerWS, ValidationError, ApplicationError };
