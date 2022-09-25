import {localStoreInstance} from "../../../libs/library";
import {SymbolAdapter} from "../adapters/SymbolAdapter";
import {UdfCompatibleConfiguration} from "../interfaces/DatafeedUDFCompatibleInterfaces";

export class UDFService {
    public base(): string {
        return "Welcome to the Skull&Bones API with UDF-Support";
    }

    public time(): number {
        return Math.floor(Date.now() / 1000);
    }

    public config(): UdfCompatibleConfiguration {
        let localSymbols = new SymbolAdapter(localStoreInstance.symbolsStore);
        return localSymbols.get_config();
    }
}
