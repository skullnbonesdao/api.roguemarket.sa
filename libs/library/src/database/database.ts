import {Collection, MongoClient, MongoServerError} from "mongodb"
import {DBTrade} from "../interfaces/DBTrade";
import {TradeHistory} from "../interfaces/DatafeedUDFCompatibleTradeInterface";
import {get_history_aggregation, get_history_before, get_history_next} from "./history_aggregation";

export class DBClient {
    private client: MongoClient | undefined
    private collection: Collection | undefined

    async init() {
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
            .catch((err) => {
                if (err.code !== 8000)
                    console.log(err)
            })
    }

    public async insert_data(db_entries: DBTrade[]): Promise<number> {
        let written_count = 0

        for (const db_entry of db_entries) {
            await this.collection
                ?.insertOne(db_entry)
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

        const cursor = await this.collection?.aggregate(
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

    public async find_next(symbol: string,
                           to: number,
    ): Promise<number | undefined> {
        let cursor = await this.collection?.aggregate(
            get_history_next(symbol, to)
        )
        let data = await cursor?.toArray()
        console.log(data)
        //TODO clean up this mess
        if (data)
            if (data.length > 0)
                return data[0].timestamp ?? undefined
            else {
                cursor = await this.collection?.aggregate(
                    get_history_before(symbol, to)
                )
                data = await cursor?.toArray()
                if (data)
                    if (data.length > 0)
                        return data[0].timestamp ?? undefined
            }
    }
}

const databaseInstance = new DBClient()
export {databaseInstance}