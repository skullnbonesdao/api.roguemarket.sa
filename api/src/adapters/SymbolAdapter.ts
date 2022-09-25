import {UdfCompatibleConfiguration, UdfSearchSymbolsResponse,} from "../interfaces/DatafeedUDFCompatibleInterfaces";
import {CustomTimezones, LibrarySymbolInfo, ResolutionString,} from "../interfaces/DatafeedInterfaces";

import {Symbol} from "../../../libs/library";

export class SymbolAdapter {
    public symbols: Symbol[] = [];
    public exchange = "GM";
    public type = "NFT";
    public timezone: "Etc/UTC" | CustomTimezones = "Etc/UTC";
    public minmov = 0.0000001;
    public minmov2 = 0.0000001;
    public minmovement = 0;
    public minmovement2 = 0;
    public supported_resolutions = [
        "1" as ResolutionString,
        "5" as ResolutionString,
        "15" as ResolutionString,
        "30" as ResolutionString,
        "60" as ResolutionString,
        "1D" as ResolutionString,
        "1W" as ResolutionString,
        "1M" as ResolutionString,
    ];
    public has_intraday = true;
    public has_daily = true;
    public has_weekly_and_monthly = true;
    public data_status = "streaming";
    public session = "24x7";
    private supports_search = true;
    private pairs = ["ATLAS", "USDC"];

    constructor(symbols: Symbol[]) {
        this.symbols = symbols;
    }

    public get_description(): string[] {
        let description: string[] = [];
        this.symbols.forEach((symbol) => {
            this.pairs.forEach((pair) => {
                if (symbol.symbol.includes(pair)) {
                    description.push(symbol.symbol.replace(pair, "") + " / " + pair);
                }
            });
        });
        return description;
    }

    public get_pricescale(): number[] {
        let pricescale: number[] = [];
        this.symbols.forEach((symbol) => {
            pricescale.push(1);
        });

        return pricescale;
    }

    public search_symbols(search_symbol: string) {
        let currency_codes: Symbol[] = [];
        this.symbols.forEach((symbol) => {
            this.pairs.forEach((pair) => {
                currency_codes.push({
                    mint: "",
                    symbol: symbol.symbol + pair,
                });
            });
        });
        console.log(search_symbol);

        //TODO Make better filtering
        this.symbols = currency_codes.filter((code) =>
            code.symbol.includes(search_symbol)
        );
    }

    public search_symbols_adv(
        query: string,
        limit?: number,
        type?: string,
        exchange?: string
    ) {
        //TODO Make better filtering sec adv
        this.symbols = this.symbols.filter((code) =>
            code.symbol_pair?.includes(query)
        );

        if (limit) {
            this.symbols.splice(limit);
        }
    }

    public get_parsed(): LibrarySymbolInfo {
        return {
            format: "price",
            currency_code: "USDC",
            data_status: "streaming",
            description: this.get_description()[0],
            exchange: this.exchange,
            full_name: this.symbols[0].symbol_pair ?? "",
            has_daily: false,
            has_intraday: this.has_intraday,
            has_weekly_and_monthly: this.has_weekly_and_monthly,
            listed_exchange: this.exchange,
            minmov: this.minmov,
            name: this.symbols[0].symbol_pair ?? "",
            pricescale: this.get_pricescale()[0],
            session: this.session,
            supported_resolutions: this.supported_resolutions,
            ticker: this.symbols[0].symbol_pair,
            timezone: this.timezone,
            type: this.type,
        };
    }

    public get_searched(): UdfSearchSymbolsResponse {
        const symbolSearch: UdfSearchSymbolsResponse = [];

        for (const [index, value] of this.symbols.entries()) {
            symbolSearch.push({
                description: this.get_description()[index],
                exchange: this.exchange,
                full_name: value.symbol_pair ?? "",
                symbol: value.symbol_pair ?? "",
                ticker: value.symbol_pair ?? "",
                type: this.type,
            });
        }

        return symbolSearch;
    }

    public get_config(): UdfCompatibleConfiguration {
        return {
            exchanges: [
                {
                    value: this.exchange,
                    name: "GalacticMarketplace",
                    desc: "GalacticMarketplace StarAtlas",
                },
            ],
            supported_resolutions: this.supported_resolutions,
            supports_search: this.supports_search,
            supports_marks: false,
            currency_codes: this.symbols.flatMap(
                (symbol) => symbol.symbol_pair ?? ""
            ),
            supports_time: true,
            supports_timescale_marks: false,
            symbols_types: [{value: this.type, name: "nfts"}],
        };
    }
}
