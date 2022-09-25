import {Currency} from "./Currency";

interface Symbol {
    symbol: string;
    mint: string;
    pair?: Currency;
    symbol_pair?: string;
}

export {Symbol}