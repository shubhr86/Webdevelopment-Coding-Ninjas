import server from "./index.js";
import { connectToDb } from "./src/config/db.js";

server.listen(4000, async () => {
  await connectToDb();
  console.log(`server is running at port 4000`);
});
