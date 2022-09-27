import {Worker} from "./worker/worker";
import {ConfirmedSignatureInfo, ParsedTransactionWithMeta} from "@solana/web3.js";
import {databaseInstance, DBTrade, ProgressBar} from "../../libs/library";


export async function executeTask(before?: string): Promise<string | undefined> {
    try {
        const worker = new Worker();

        const signatures: ConfirmedSignatureInfo[] = await worker.getSignatures(parseInt(process.env.LIMIT ?? "100"), before);

        if (signatures.length != 0) {

            let transactions = await worker.getTransactions(
                signatures.map((signature) => signature.signature)
            );

            transactions = worker.filterWithLogs(transactions);

            let trades: DBTrade[] = [];
            transactions.forEach((transaction) =>
                trades.push(worker.mapToDB(transaction as ParsedTransactionWithMeta))
            );

            const written = await databaseInstance.insert_data(trades)
            worker.printStatus(process.env.MODE ?? "", written);

            return signatures[signatures.length - 1].signature
        } else {
            console.log("last signature")

        }
    } catch (err) {
        console.error(err)
        console.log(before)

    }

    const progress = new ProgressBar(10)
    await progress.execute()

    return before
}