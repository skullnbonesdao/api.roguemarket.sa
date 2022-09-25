import {Symbol} from "../interfaces/Symbol";
import axios, {AxiosResponse} from "axios";
import {Currency} from "../interfaces/Currency";
import {StarAtlasAPI} from "../interfaces/StarAtlasAPI";
import {STARATLASAPIURL} from "../constants/constants";

class LocalStoreAdapter {
    public initialized = false;
    public symbolsStore: Symbol[] = [];
    public currencyStore: Currency[] = [
        {
            symbol: "USDC",
            mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        },
        {
            symbol: "ATLAS",
            mint: "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx",
        },
    ];

    public async init() {
        this.symbolsStore = await this.initSymbols();
        this.initialized = true;
        console.log("LocalStoreAdapter initialized");
    }

    private async initSymbols(): Promise<Symbol[]> {
        let staratlas_list: StarAtlasAPI[] = [];

        /*
                fetch(STARATLASAPIURL)
                  .then((res) => res.json())
                  .then((data) => (staratlas_list = data));
            */

        await axios
            .get(STARATLASAPIURL)
            .then((response: AxiosResponse<StarAtlasAPI[]>) => {
                staratlas_list = response.data;
            });

        let symbols: Symbol[] = [];
        staratlas_list.forEach((asset) => {
            this.currencyStore.forEach((code) => {
                symbols.push({
                    symbol: asset.symbol,
                    mint: asset.mint,
                    pair: code,
                    symbol_pair: asset.symbol + code.symbol,
                });
            });
        });

        return symbols;
    }
}

const localStoreInstance = new LocalStoreAdapter();
export {localStoreInstance};
