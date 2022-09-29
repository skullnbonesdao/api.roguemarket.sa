import { CURRENCIES } from "../constants/currencies";
import { ParsedInstruction } from "./ParsedInstruction";

import { Types } from 'mongoose';

export interface IDBTrade {
    signature: string;
    timestamp: number;
    slot: number;
    symbol: string
    trade?: ITrade[];
}

export interface ITrade {
    side: number;
    seller: string;
    buyer: string;
    currency_mint: string;
    token_mint: string;
    currency_amount: number;
    token_amount: number;
}

export function toTrade(parsed_instruction: ParsedInstruction[]): ITrade | undefined {
    if (parsed_instruction.length == 3) {


        let trade: ITrade = {
            side: 0,
            seller: "",
            buyer: "",
            currency_mint: "",
            token_mint: "",
            currency_amount: 0,
            token_amount: 0,
        };

        const transfers = parsed_instruction.filter(
            (instruction) =>
                instruction.parsed?.type === "transferChecked" &&
                instruction.parsed?.info.tokenAmount.uiAmount > 0
        );

        trade.side = CURRENCIES.includes(transfers[0].parsed?.info.mint) ? 0 : 1;
        trade.seller = transfers[0].parsed?.info.destination
        trade.buyer = transfers[1].parsed?.info.destination

        trade.currency_mint =
            transfers.find((transfer) => CURRENCIES.includes(transfer.parsed?.info.mint))
                ?.parsed?.info.mint ?? "";

        trade.token_mint =
            transfers.find(
                (transfer) => !CURRENCIES.includes(transfer.parsed?.info.mint)
            )?.parsed.info.mint ?? "";

        trade.currency_amount =
            transfers.find((transfer) => CURRENCIES.includes(transfer.parsed?.info.mint))
                ?.parsed.info.tokenAmount.uiAmount ?? 0;

        trade.token_amount =
            transfers.find(
                (transfer) => !CURRENCIES.includes(transfer.parsed?.info.mint)
            )?.parsed?.info.tokenAmount.uiAmount ?? 0;

        return trade;
    }
    return undefined
}
