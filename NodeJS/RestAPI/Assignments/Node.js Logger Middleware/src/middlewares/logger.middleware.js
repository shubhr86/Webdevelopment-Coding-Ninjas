// Please don't change the pre-written code
// Import the necessary modules here

// Write your code here
import fs from 'fs';
const fsPromise = fs.promises;
export const loggerMiddleware = async (req, res, next) => {
  // Write your code here
  if(!req.url.includes("login")){
  const logData = `\n ${"req URL: /api/user"}${req.url}\n ${"reqBody: "} ${JSON.stringify(req.body)}\n`;
  await log(logData);
  }
  next();
};
async function log(logData){
  try{
    logData= `\n ${new Date().toString()} ${logData}`;
    await fsPromise.appendFile('log.txt', logData);
  }catch(err){
    console.log(err);
  }
}
export default loggerMiddleware;
