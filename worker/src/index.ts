import {run_sync} from "./run_sync";
import "log-timestamp"
import {run_loop} from "./run_loop";
import {DBClient} from "../../libs/library"


console.log("--- Starting ---");

const db = new DBClient()

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
