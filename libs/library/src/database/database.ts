import {Collection, MongoClient, MongoServerError} from "mongodb"
import {DBTrade} from "../interfaces/DBTrade";

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
}