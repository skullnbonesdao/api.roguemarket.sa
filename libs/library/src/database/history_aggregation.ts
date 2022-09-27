import {timeConvert} from "../helper/TimeConvert";

export function get_history_aggregation(symbol: string, resolution: string, from: number, to: number) {

    let resolution_num = timeConvert(resolution)
    return [
        {
            $match: {
                "symbol": symbol,
            },
        },
        {
            $match: {
                timestamp: {$lt: to, $gt: from},
            },
        },
        {
            $addFields: {
                time: {
                    $toDate: {
                        $multiply: ["$timestamp", 1000],
                    },
                },
                symbol: "$trade.symbol",
                price: {
                    $divide:
                        [{
                            $sum: "$trade.currency_amount"
                        }, {
                            $sum: "$trade.token_amount"
                        }]
                },
                volume: {$sum: "$trade.token_amount"},
            },
        },
        {
            $group: {
                _id: {
                    time: {
                        $dateTrunc: {
                            date: "$time",
                            unit: "minute",
                            binSize: resolution_num,
                        },
                    },
                },
                time_last: {
                    $last: "$timestamp",
                },
                high: {
                    $max: "$price",
                },
                low: {
                    $min: "$price",
                },
                open: {
                    $first: "$price",
                },
                close: {
                    $last: "$price",
                },
                volume: {
                    $sum: "$volume",
                },
            },
        },
        {
            $sort: {
                time_last: 1,
            },
        },
    ];
}
