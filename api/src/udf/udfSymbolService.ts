import {DBClient, localStoreInstance} from "../../../libs/library";
import {TradeHistory} from "../interfaces/DatafeedUDFCompatibleTradeInterface";
import {SymbolAdapter} from "../adapters/SymbolAdapter";
import {UdfErrorResponse, UdfSearchSymbolsResponse,} from "../interfaces/DatafeedUDFCompatibleInterfaces";
import {LibrarySymbolInfo} from "../interfaces/DatafeedInterfaces";

//import {databaseAdapter} from "../adapters/DatabaseAdapter";

export class UDFSymbolService {
    public symbol_info(): LibrarySymbolInfo {
        let localSymbols = new SymbolAdapter(localStoreInstance.symbolsStore);

        return localSymbols.get_parsed();
    }

    public symbols(search_symbol: string): LibrarySymbolInfo | UdfErrorResponse {
        console.log(search_symbol);

        let localSymbols = new SymbolAdapter(localStoreInstance.symbolsStore);

        try {
            localSymbols.search_symbols_adv(search_symbol);

            return localSymbols.get_parsed();
        } catch (err) {
            return {
                s: "error",
                errmsg: `Error finding symbol: ${search_symbol}`,
            };
        }
    }

    public searchSymbols(
        query: string,
        limit?: number,
        type?: string,
        exchange?: string
    ): UdfSearchSymbolsResponse | UdfErrorResponse {
        let localSymbols = new SymbolAdapter(localStoreInstance.symbolsStore);

        try {
            localSymbols.search_symbols_adv(query, limit, type, exchange);
            return localSymbols.get_searched();
        } catch (err) {
            return {
                s: "error",
                errmsg: `Error finding symbol: ${query}`,
            };
        }
    }

    public async history(
        symbol: string,
        from: number,
        to: number,
        resolution: string,
        countback?: number,
        currentyCode?: string
    ): Promise<TradeHistory | UdfErrorResponse> {
        let result: TradeHistory | UdfErrorResponse
        try {
            const db = new DBClient()

            let tradeHistory = await db.query_candleStick(symbol, resolution, from, to)

            result = tradeHistory

            /*  if (tradeHistory.t.length > 0)
                  result = tradeHistory
              else {
                  let next_time: number | undefined = await db.getNextTimestamp(symbol, to);
                  result = {
                      s: "no_data",
                      nextTime: next_time
                  }
              }*/
        } catch (e) {
            console.log(e)
            result = {
                s: "error",
                errmsg: `Error finding history: ${symbol}`,
            };
        }
        return result
    }
}
