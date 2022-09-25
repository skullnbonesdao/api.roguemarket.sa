import {ParsedTransactionWithMeta} from "@solana/web3.js";

import {Worker} from "../worker/worker"
import fuel_trade_json from "./samples/input/fuel_trade.json";
import px4_trade_json from "./samples/input/px4_arb_trade.json";

import fuel_db_json from "./samples/output/fuel_trade.json";
import px4_db_json from "./samples/output/px4_arb_trade.json";

describe("mapper", function () {
    it("map_fuel", function () {

        // @ts-ignore
        const tx: ParsedTransactionWithMeta = fuel_trade_json

        const worker = new Worker();

        let db_output = worker.mapToDB(tx);

        expect(db_output).toStrictEqual(fuel_db_json);
    });

    it("map_px4_arb", async function () {
        const px4_trade = px4_trade_json as unknown as ParsedTransactionWithMeta;

        const worker = new Worker();

        const db_output = worker.mapToDB(px4_trade);

        expect(db_output).toStrictEqual(px4_db_json);
    });
});
