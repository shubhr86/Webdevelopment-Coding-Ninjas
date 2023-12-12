export class customErrorHandler extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export const appLevelErrorHandlerMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "server error! Try later!!";
    console.error('Global Error Handler:', err);
    res.status(err.statusCode).json({ success: false, error: err.message });
    next();
  };
  