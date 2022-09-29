import {run_sync} from "./run_sync";
import "log-timestamp"
import {run_loop} from "./run_loop";
import {localStoreInstance, mdatabase} from "../../libs/library"
import * as dotenv from 'dotenv'

dotenv.config()


const startUp = async () => {
    console.log("--- Initialization ---");
    await localStoreInstance.init()
    await mdatabase.init(false)


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


