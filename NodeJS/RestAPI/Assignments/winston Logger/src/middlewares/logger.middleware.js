// Please don't change the pre-written code
// Import the necessary modules here

// Write your code here
import winston from 'winston';
import fs from 'fs';

export const loggerMiddleware = async (req, res, next) => {
  // Write your code here
  const timestamp= new Date().toString();
  const reqUrl= `req URL: /api/user${req.url}`;
  const reqBody=`reqBody: ${JSON.stringify(req.body)}`;
  
  if (!req.url.includes('login')){
    const logData = {
    level:'info',
    message: `${timestamp}\n ${reqUrl}\n ${reqBody}`,
    service:'user-service',
  };
  logger.info(logData);
}
  next();
};
const logger = winston.createLogger({
  level:'info',
  format:winston.format.json(),
  transports:{service:'message:'}, 

  transports:[new winston.transports.File({filename:'combined.log'})]
});
export default loggerMiddleware;
