// Please don't change the pre-written code

export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Handle intentionally thrown errors with custom status codes and messages
  if (err instanceof customErrorHandler) {
    res.status(err.statusCode).send(err.message );
  } else {
    // Handle unhandled errors with a default "500" status code
    res.status(500).send("Oops! Something went wrong... Please try again later!");
  }
};

