import { run_sync } from "./run_sync";
import "log-timestamp"
import { run_loop } from "./run_loop";
import { mdatabase, localStoreInstance, databaseInstance } from "../../libs/library"
import * as dotenv from 'dotenv'

dotenv.config()



const startUp = async () => {
    console.log("--- Initialization ---");
    await localStoreInstance.init()
    await mdatabase.init('mongodb+srv://writer:CJgSvhEK0VRTDgdD@cluster0.pzla8ld.mongodb.net/?retryWrites=true&w=majority')


    switch (process.env.MODE) {
        case "loop": {
            run_loop()
                .then(() => mdatabase.close())
                .catch((err) => console.log(err));
            break
        }
        case "sync": {
            run_sync()
                .then(() => mdatabase.close())
                .catch((err) => console.log(err));
            break
        }
    }


}

startUp()
    .catch((err) => console.log(err))


