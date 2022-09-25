import {RethinkDB, sleep} from "../../libs/library"
import {executeTask} from "./executeTask";


export const run_loop = async (database: RethinkDB) => {


    while (true) {
        await executeTask(database);
        await sleep(parseInt(process.env.SLEEP ?? "10000"))
    }

};