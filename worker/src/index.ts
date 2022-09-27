import {run_sync} from "./run_sync";
import "log-timestamp"
import {run_loop} from "./run_loop";
import {databaseInstance, localStoreInstance} from "../../libs/library"


console.log("--- Starting ---");


const startUp = async () => {
    databaseInstance.init()
    await localStoreInstance.init()
}

startUp().catch((err) => console.log(err))


switch (process.env.MODE) {
    case "loop": {
        run_loop().catch((err) => console.log(err));
        break
    }
    case "sync": {
        run_sync().catch((err) => console.log(err));
        break
    }
}
