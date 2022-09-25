import {run_sync} from "./run_sync";
import "log-timestamp"
import {run_loop} from "./run_loop";
import {localStoreInstance, RethinkDB} from "../../libs/library"


console.log("--- Starting ---");

const db = new RethinkDB()
const startUp = async (db: RethinkDB) => {
    await localStoreInstance.init()
    await db.init()
    await db.createDBandTable()
}

startUp(db).catch((err) => console.log(err))


switch (process.env.MODE) {
    case "loop": {
        run_loop(db).catch((err) => console.log(err));
        break
    }
    case "sync": {
        run_sync(db).catch((err) => console.log(err));
        break
    }
}
