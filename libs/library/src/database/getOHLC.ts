import {r} from 'rethinkdb-ts';
import {timeConvert} from "../helper/TimeConvert";

export async function getOHLC(connection: any, symbol: string, resolution: string, from: number, to: number) {

    const resolution_number = timeConvert(resolution)

    return await r
        .db('staratlas')
        .table('trades')
        .filter({'symbol': symbol})
        .orderBy('timestamp')
        .filter(function (trade: any) {
            return trade('timestamp').lt(to)
        })
        .filter(function (trade: any) {
            return trade('timestamp').gt(from)
        })
        .map(function (trade: any) {
            return {
                timestamp: trade('timestamp'),
                currency_amount: trade('trade')('currency_amount').sum(),
                token_amount: trade('trade')('token_amount').sum(),
                price: trade('trade')('currency_amount').sum().div(trade('trade')('token_amount').sum())
            }
        })
        .group(function (trade: any) {
            return trade('timestamp').mod(resolution_number)
        })
        .ungroup()
        .map(function (trade: any) {
            return {
                t: trade('reduction')('timestamp').nth(0),
                o: trade('reduction')('price').nth(0),
                c: trade('reduction')('price').nth(-1),
                h: trade('reduction')('price').max(),
                l: trade('reduction')('price').min(),
                v: trade('reduction')('token_amount').sum()
            }
        })
        .run(connection)

}