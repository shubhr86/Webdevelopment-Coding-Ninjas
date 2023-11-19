// import fs from 'fs';

// const fsPromise = fs.promises;

// async function log(logData) {
//     try {
//         logData = `\n ${new Date().toString()} - ${logData}`;
//         await fsPromise.appendFile(
//             'console.log', 
//             logData
//             );
//     } catch(err) {
//         console.log(err);
//     }
// }

// const loggerMiddleware = async (
//     req, 
//     res, 
//     next
// ) => { 
//     // 1. Log request body.
//     if(!req.url.includes("signin")){
//         const logData = `${req.url
//         } - ${JSON.stringify(req.body)}`;
//         await log(logData);
//     }
//     next();
// };

// export default loggerMiddleware;

import winston from 'winston';
import path from 'path';

//const logPath = path.join(src, 'console.log');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'console.log' }),
  ],
  format: winston.format.combine(
    winston.format.json()
  ),
});

 const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toString();
  const reqUrl = `${req.method} ${req.url}`;
  const reqBody = req.method === 'POST' ? JSON.stringify(req.body) : '';

  if (!req.url.includes("signin")){
    const logData = {
      level: 'info',
      timestamp,
      requestURL: reqUrl,
      requestBody: reqBody,
    };  
    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;