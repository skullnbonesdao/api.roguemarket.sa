import {DBClient, sleep} from "../../libs/library";
import {executeTask} from "./executeTask";

export const run_sync = async (database: DBClient) => {


    let last_signature = process.env.SIGNATURE
    do {
        console.log(`last_signature=${last_signature}`)
        last_signature = await executeTask(database, last_signature);
        if (last_signature === "restart") {
            console.log("--- restart in 10s ---")
            await sleep(10000)
        }
        await sleep(parseInt(process.env.SLEEP ?? "10000"))
    } while (last_signature != undefined)

};