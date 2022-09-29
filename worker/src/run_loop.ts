import { sleep } from "../../libs/library"
import { executeTask } from "./executeTask";


export const run_loop = async () => {
    while (true) {
        await executeTask();
        await sleep(parseInt(process.env.SLEEP ?? "10000"))
    }
};