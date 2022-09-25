import {r} from 'rethinkdb-ts';
import {DBTrade} from "../interfaces/DBTrade";
import {getOHLC} from "./getOHLC";
import {getNext} from "./getNext";

const config = {
    host: process.env.RETHINKDB_HOST || 'localhost',
    port: parseInt(process.env.RETHINKDB_PORT || '', 10) || 28015,

};

const DBNAME = "staratlas"
const TABLENAME = "trades"


interface OHCL {
    t: number,
    o: number,
    h: number,
    c: number,
    l: number,
    v: number,
}

export class RethinkDB {
    private connection: any

    async init() {
        this.connection = await r.connect(config)
    }

    async createDBandTable() {

        await r.connect(config)
        try {
            let r1 = await r.dbCreate(DBNAME).run(this.connection)
            console.log(`DB-Create:
         ${r1}`)
        } catch (err) {
            console.log("Could not create DB - exists?")
        }
        try {
            const r2 = await r.db(DBNAME).tableCreate(TABLENAME, {primaryKey: "signature"}).run(this.connection)
            await r.db(DBNAME).table(TABLENAME).indexCreate('symbol').run(this.connection)
            await r.db(DBNAME).table(TABLENAME).indexCreate('timestamp').run(this.connection)
            console.log(`Table-Create:
         ${r2}`)
        } catch (err) {
            console.log("Could not create Table - exists?")
        }
    }

    async insert(trades: DBTrade[]): Promise<number> {


        const r1: any = await r
            .db(DBNAME)
            .table(TABLENAME)
            .insert(trades, {durability: "hard", returnChanges: true, conflict: "error", ignoreWriteHook: false})
            .run(this.connection)

        if (r1) {
            return r1.inserted
        }
        return 0
    }

    async getCandleSticks(symbol: string, resolution: string, from: number, to: number): Promise<OHCL[]> {
        let ohcl: any = await getOHLC(this.connection, symbol, resolution, from, to)
        ohcl.sort((a: any, b: any) => a.t - b.t)

        return ohcl
    }

    async getNextTimestamp(symbol: string, to: number): Promise<number> {
        const r = await getNext(this.connection, symbol, to) as any
        return r[0]
    }

}

