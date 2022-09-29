import {Connection, ParsedTransactionWithMeta, PublicKey,} from "@solana/web3.js";
import {IDBTrade, localStoreInstance, MARKETPLACEPROGRAM, toParsedInstruction, toTrade} from "../../../libs/library"

interface IWorker {
    connection: Connection;
}

interface Status {
    signatures_length: number;
    transactions_length: number;
    filter_length: number;
    map_length: number;
}

export class Worker implements IWorker {
    connection: Connection;
    status: Status;

    constructor() {
        this.connection = new Connection(process.env.SOLANARPC ?? "https://api.devnet.solana.com");
        this.status = {
            signatures_length: 0,
            transactions_length: 0,
            filter_length: 0,
            map_length: 0,
        };
    }

    async getSignatures(limit: number, before?: string | undefined) {
        let signatures = await this.connection.getSignaturesForAddress(
            new PublicKey(MARKETPLACEPROGRAM),
            {limit, before}
        );
        signatures = signatures.filter(sig =>
            sig.err === null
            &&
            true
        )

        this.status.signatures_length = signatures.length;
        return signatures;
    }

    async getTransactions(signatures_list: string[]) {
        const transactions = await this.connection.getParsedTransactions(
            signatures_list
        );
        this.status.transactions_length = transactions.length;
        return transactions;
    }

    filterWithLogs(transactions: (ParsedTransactionWithMeta | null)[]) {
        let filtered_transaction = transactions.filter((trans) =>
            trans?.meta?.logMessages?.some((log) => log.includes("ProcessExchange"))
        );


        this.status.filter_length = filtered_transaction.length;
        return filtered_transaction;
    }

    mapToDB(transaction: ParsedTransactionWithMeta): IDBTrade {
        const db_trade: IDBTrade = {
            symbol: "",
            signature: transaction.transaction.signatures[0],
            timestamp: transaction.blockTime ?? 0,
            slot: transaction.slot ?? 0,
            trade: [],
        };


        for (
            let index = 0;
            index < (transaction.meta?.innerInstructions?.length ?? 0);
            index++
        ) {
            if (
                transaction.transaction.message.instructions[
                    index
                    ].programId.toString() === MARKETPLACEPROGRAM
            ) {
                const instructions = toParsedInstruction(
                    JSON.stringify(
                        transaction.meta?.innerInstructions?.[index]?.instructions
                    )
                );

                for (let index = 0; index < instructions.length; index += 3) {

                    try {
                        let t = toTrade(instructions.splice(index, 3))
                        if (t) db_trade.trade?.push(t)
                    } catch (err) {
                        console.log(err)
                        console.log(transaction.transaction.signatures[0])
                        throw "err - in mapping trade"
                    }


                }
            }
        }

        const mint_token = db_trade.trade ? db_trade.trade[0].token_mint : ""
        const mint_currency = db_trade.trade ? db_trade.trade[0].currency_mint : ""

        db_trade.symbol = localStoreInstance.symbolsStore.find(
            (symbol: any) => symbol.mint === mint_token
        )?.symbol ?? "error"
        db_trade.symbol += localStoreInstance.currencyStore.find(
            (curr: any) => curr.mint === mint_currency
        )?.symbol


        this.status.map_length += 1;
        return db_trade;
    }


    printStatus(mode: string, written: number) {
        const structDatas = `mode: ${mode}
|> signatures:\t\t${this.status.signatures_length}  
|> transactions:\t${this.status.transactions_length}  
|> filtered:\t\t${this.status.filter_length}  
|> dbEntries:\t\t${this.status.map_length}  
|> written:\t\t${written}`;
        console.table(structDatas);
    }
}
