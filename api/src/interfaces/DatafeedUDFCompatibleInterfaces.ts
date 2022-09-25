import {
    DatafeedConfiguration,
    LibrarySymbolInfo,
    Mark,
    SearchSymbolResultItem,
    TimescaleMark,
} from "./DatafeedInterfaces";

export interface UdfErrorResponse {
    s: "error" | "no_data";
    nextTime?: number;
    errmsg?: string;
}

export interface UdfCompatibleConfiguration extends DatafeedConfiguration {
    // tslint:disable:tv-variable-name
    supports_search?: boolean;
    supports_group_request?: boolean;
    // tslint:enable:tv-variable-name
}

export interface ResolveSymbolResponse extends LibrarySymbolInfo {
    s: undefined;
}

// it is hack to let's TypeScript make code flow analysis
export interface UdfSearchSymbolsResponse
    extends Array<SearchSymbolResultItem> {
    s?: undefined;
}

export const enum Constants {
    SearchItemsLimit = 30,
}

type UdfDatafeedMarkType<T extends TimescaleMark | Mark> = {
    [K in keyof T]: T[K] | T[K][];
} & {
    id: (string | number)[];
};

type UdfDatafeedMark = UdfDatafeedMarkType<Mark>;
type UdfDatafeedTimescaleMark = UdfDatafeedMarkType<TimescaleMark>;

function extractField<Field extends keyof Mark>(
    data: UdfDatafeedMark,
    field: Field,
    arrayIndex: number
): Mark[Field];
function extractField<Field extends keyof TimescaleMark>(
    data: UdfDatafeedTimescaleMark,
    field: Field,
    arrayIndex: number
): TimescaleMark[Field];
function extractField<T, TField extends keyof T>(
    data: T,
    field: TField,
    arrayIndex: number
): T[TField] {
    const value = data[field];
    return Array.isArray(value) ? value[arrayIndex] : value;
}

interface IExternalDatafeed {
}

interface IDatafeedQuotesApi {
}

interface IDatafeedChartApi {
}
