export function get_history_aggregation(symbol: string, from: number, to: number, resolution: string) {
    return [
        {
            $match: {
                "trade.symbol": symbol,
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
                price: "$trade.cost_price",
                volume: "$trade.size",
            },
        },
        {
            $group: {
                _id: {
                    time: {
                        $dateTrunc: {
                            date: "$time",
                            unit: "minute",
                            binSize: parseInt(resolution),
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
