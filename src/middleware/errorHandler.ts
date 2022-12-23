class ApplicationError extends Error {
   constructor(message) {
      super(message);
      // name is set to the name of the class
      this.name = this.constructor.name;
   }
}

class ValidationError extends ApplicationError {
   public cause: any;

   constructor(message, cause?) {
      super(message);
      this.cause = cause;
   }
}

function errorHandler(err, req, res, next) {
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

export { errorHandler, ValidationError, ApplicationError };
