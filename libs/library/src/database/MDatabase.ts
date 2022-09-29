import * as mongoose from 'mongoose'
import {IDBTrade} from '../interfaces/DBTrade'

const options = {
    autoIndex: false, maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};


const DBTradeSchema = new mongoose.Schema<IDBTrade>(
    {
        signature: {type: String, required: true, unique: true, index: true},
        timestamp: {type: Number, required: true, unique: false, index: true},
        slot: {type: Number, required: true, unique: false, index: false},
        symbol: {type: String, required: true, unique: false, index: true},
        trade: [{
            side: Number,
            seller: String,
            buyer: String,
            currency_mint: String,
            token_mint: String,
            currency_amount: Number,
            token_amount: Number
        }]
    }
)


export class MDatabase {
    private connection: any;
    private DBTrade: mongoose.Model<IDBTrade> | undefined;

    constructor(connect_str: string) {
    }

    public async init(options?: boolean) {

        if (options) {
            mongoose.connect(process.env.MONGOURL ?? "", {
                autoIndex: false, maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4
            })
                .then(con => {
                    this.connection = con
                    console.info('DB Connected with options!');
                })
                .catch(err => console.log(err.reason))
            ;

        } else {
            await mongoose.createConnection(process.env.MONGOURL ?? "")
                .asPromise()
                .then((con) => {
                    console.info('DB Connected!');
                    this.connection = con
                })
                .catch(err => console.error(err))
        }
        this.DBTrade = this.connection?.model('trade', DBTradeSchema)
    }

    public status() {
        console.log(`DBConnection: 
        ${this.connection}`);
    }

    public close() {
        this.connection
            ?.close()
            .then(() => console.log('DB connection closed!'))
            .catch((err: any) => console.log(err))
    }

    public async insert(trades: IDBTrade[]): Promise<number> {
        let inserted = 0

        for (let i = 0; i < trades.length; i++) {
            if (this.DBTrade) {
                try {
                    const t = new this.DBTrade(trades[i]);
                    await t.save()
                    inserted++
                } catch (err: any) {
                    if (err.code != 11000)
                        console.log(err)
                }
            }
        }
        return inserted
    }

}

const mdatabase = new MDatabase('')

export {mdatabase}