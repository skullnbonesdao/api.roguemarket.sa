import { r } from "rethinkdb-ts";

export async function getNext(connection: any, symbol: string, to: number) {
  return await r
    .db("staratlas")
    .table("trades")
    .orderBy({ index: r.desc("timestamp") })
    .filter({ symbol: "FOODATLAS" })
    .filter(function (trade: any) {
      return trade("timestamp").lt(to);
    })
    .limit(1)
    .map(function (trade: any) {
      return trade("timestamp");
    })
    .run(connection);
}
