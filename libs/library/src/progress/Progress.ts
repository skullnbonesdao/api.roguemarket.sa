// @ts-ignore
import cliProgress from "cli-progress";
import {sleep} from "../helper/Sleep";

export class ProgressBar {
    private bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    private total = 0

    constructor(total: number) {
        this.total = total
        console.log(`-> sleep for ${this.total}s`)
        this.bar1.start(this.total, 0)

    }

    async execute() {

        while (this.total > 0) {
            await sleep(1000)
            this.bar1.increment()
            this.total--
        }
        this.bar1.stop()
    }


}