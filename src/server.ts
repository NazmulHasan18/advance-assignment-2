import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

const { port, database } = config;

async function main() {
   try {
      await mongoose.connect(database as string);

      app.listen(port, () => {
         console.log(`Example app listening on port ${port}`);
      });
   } catch (error) {
      console.log(error);
   }
}
main();
