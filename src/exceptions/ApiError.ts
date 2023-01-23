class BaseError extends Error {
   httpCode: number;
   constructor(message: string, httpCode: number) {
      super(message);

      this.name = this.constructor.name;
      this.httpCode = httpCode;
   }
}

class UnauthorizedError extends BaseError {
   constructor(message = "User not authorized", httpCode = 401) {
      super(message, httpCode);
   }
}

class BadRequest extends BaseError {
   constructor(message: string, httpCode = 400) {
      super(message, httpCode);
   }
}

export {UnauthorizedError, BadRequest}