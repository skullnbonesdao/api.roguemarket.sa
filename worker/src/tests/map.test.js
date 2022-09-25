"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("../src/worker/worker");
const fuel_trade_json_1 = __importDefault(require("./samples/input/fuel_trade.json"));
const px4_arb_trade_json_1 = __importDefault(require("./samples/input/px4_arb_trade.json"));
const fuel_trade_json_2 = __importDefault(require("./samples/output/fuel_trade.json"));
const px4_arb_trade_json_2 = __importDefault(require("./samples/output/px4_arb_trade.json"));
describe("mapper", function () {
    it("map_fuel", function () {
        // @ts-ignore
        const tx = fuel_trade_json_1.default;
        const worker = new worker_1.Worker();
        let db_output;
        db_output = worker.mapToDB(tx);
        expect(db_output).toStrictEqual(fuel_trade_json_2.default);
    });
    it("map_px4_arb", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const px4_trade = px4_arb_trade_json_1.default;
            const worker = new worker_1.Worker();
            const db_output = worker.mapToDB(px4_trade);
            expect(db_output).toStrictEqual(px4_arb_trade_json_2.default);
        });
    });
});
