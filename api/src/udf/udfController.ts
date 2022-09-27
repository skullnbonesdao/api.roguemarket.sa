import {Controller, Get, Query, Route, Tags} from "tsoa";
import {UDFService} from "./udfService";
import {UDFSymbolService} from "./udfSymbolService";
import {TradeHistory} from "../interfaces/DatafeedUDFCompatibleTradeInterface";
import {
    UdfCompatibleConfiguration,
    UdfErrorResponse,
    UdfSearchSymbolsResponse,
} from "../interfaces/DatafeedUDFCompatibleInterfaces";
import {LibrarySymbolInfo} from "../interfaces/DatafeedInterfaces";

@Route("")
@Tags("UDF")
export class UDFController extends Controller {
    /**
     * Retrieves a status message.
     */
    @Get()
    public async base(): Promise<string> {
        return new UDFService().base();
    }

    /**
     * Retrieves a timestamp form the server in UTC.
     */
    @Get("time")
    public async time(): Promise<number> {
        return new UDFService().time();
    }

    /**
     * Retrieves a config form the server for UDF.
     */
    @Get("config")
    public async config(): Promise<UdfCompatibleConfiguration> {
        return new UDFService().config();
    }

    /**
     * Retrieves a symbol-info object containing all symbols.
     */
    @Get("symbol_info")
    public async symbol_info(@Query() group: string): Promise<LibrarySymbolInfo> {
        return new UDFSymbolService().symbol_info();
    }

    /**
     * Retrieves a symbol-info object containing searched symbols.
     */
    @Get("symbols")
    public async symbols(
        @Query() symbol: string
    ): Promise<LibrarySymbolInfo | UdfErrorResponse> {
        return new UDFSymbolService().symbols(symbol);
    }

    /**
     * Retrieves a symbol-info object searched (advanced) all symbols.
     */
    @Get("search")
    public async search(
        @Query() query: string,
        @Query() limit: number,
        @Query() type?: string,
        @Query() exchange?: string
    ): Promise<UdfSearchSymbolsResponse | UdfErrorResponse> {
        return new UDFSymbolService().searchSymbols(query, limit, type, exchange);
    }

    /**
     * Retrieves a history object for a symbols.
     */
    @Get("history")
    public async history(
        @Query() symbol: string,
        @Query() resolution: string,
        @Query() from: number,
        @Query() to: number,
        @Query() countback?: number,
        @Query() currencyCode?: string
    ): Promise<TradeHistory | UdfErrorResponse> {
        return await new UDFSymbolService().history(
            symbol,
            from,
            to,
            resolution,
            countback,
            currencyCode
        );
    }
}
