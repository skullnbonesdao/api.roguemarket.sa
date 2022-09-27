import {Collection, MongoClient, MongoServerError} from "mongodb"
import {DBTrade} from "../interfaces/DBTrade";
import {TradeHistory} from "../interfaces/DatafeedUDFCompatibleTradeInterface";
import {get_history_aggregation} from "./history_aggregation";

export class DBClient {
    private client: MongoClient
    private collection: Collection

    constructor() {
        this.client = new MongoClient(process.env.MONGOURL ?? "")

        this.client
            .connect()
            .then((r) => console.log("> DB Connected"))
            .catch((err) => console.log(err))

        this.collection = this.client
            .db(process.env.MONGODB || "market")
            .collection(process.env.MONGOCOL || "trades")

        this.collection
            .createIndex(
                {signature: 1},
                {
                    unique: true,
                }
            )
            .then((r) => console.log("> DB index created"))
            .catch((err) => console.log(err))
    }

    public async insert_data(db_entries: DBTrade[]): Promise<number> {
        let written_count = 0

        for (const db_entry of db_entries) {
            await this.collection
                .insertOne(db_entry)
                .then((result) => (written_count += 1))
                .catch((err) => {
                    if (!(err instanceof MongoServerError)) {
                        console.log(err)
                    }
                })
        }
        return written_count
    }

    public async query_candleStick(
        symbol: string,
        resolution: string,
        from: number,
        to: number,
        countback?: number,
        currentyCode?: string
    ): Promise<TradeHistory> {
        let trades: TradeHistory = {
            c: [],
            h: [],
            l: [],
            o: [],
            s: "",
            t: [],
            v: [],
        };

        const cursor = this.collection?.aggregate(
            get_history_aggregation(symbol, resolution, from, to)
        );

        const data = await cursor?.toArray();

        data?.forEach((d) => {
            trades.o.push(d.open.toFixed(6));
            trades.c.push(d.close.toFixed(6));
            trades.h.push(d.high.toFixed(6));
            trades.l.push(d.low.toFixed(6));
            trades.t.push(d.time_last);
            trades.v.push(d.volume.toFixed(6));
        });
        trades.s = "ok";

        return trades;
    }
}