/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UDFController } from './../udf/udfController';
import type { RequestHandler } from 'express';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Exchange": {
        "dataType": "refObject",
        "properties": {
            "value": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "desc": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Nominal_string.ResolutionString_": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"dataType":"string"},{"dataType":"nestedObjectLiteral","nestedProperties":{"undefined":{"dataType":"enum","enums":["ResolutionString"],"required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResolutionString": {
        "dataType": "refAlias",
        "type": {"ref":"Nominal_string.ResolutionString_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.Unit-Array_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CurrencyItem": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "code": {"dataType":"string","required":true},
            "logoUrl": {"dataType":"string"},
            "description": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DatafeedSymbolType": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "value": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UdfCompatibleConfiguration": {
        "dataType": "refObject",
        "properties": {
            "exchanges": {"dataType":"array","array":{"dataType":"refObject","ref":"Exchange"}},
            "supported_resolutions": {"dataType":"array","array":{"dataType":"refAlias","ref":"ResolutionString"}},
            "units": {"ref":"Record_string.Unit-Array_"},
            "currency_codes": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"CurrencyItem"}]}},
            "supports_marks": {"dataType":"boolean"},
            "supports_time": {"dataType":"boolean"},
            "supports_timescale_marks": {"dataType":"boolean"},
            "symbols_types": {"dataType":"array","array":{"dataType":"refObject","ref":"DatafeedSymbolType"}},
            "supports_search": {"dataType":"boolean"},
            "supports_group_request": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CustomTimezones": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Africa/Cairo"]},{"dataType":"enum","enums":["Africa/Johannesburg"]},{"dataType":"enum","enums":["Africa/Lagos"]},{"dataType":"enum","enums":["America/Argentina/Buenos_Aires"]},{"dataType":"enum","enums":["America/Bogota"]},{"dataType":"enum","enums":["America/Caracas"]},{"dataType":"enum","enums":["America/Chicago"]},{"dataType":"enum","enums":["America/El_Salvador"]},{"dataType":"enum","enums":["America/Juneau"]},{"dataType":"enum","enums":["America/Lima"]},{"dataType":"enum","enums":["America/Los_Angeles"]},{"dataType":"enum","enums":["America/Mexico_City"]},{"dataType":"enum","enums":["America/New_York"]},{"dataType":"enum","enums":["America/Phoenix"]},{"dataType":"enum","enums":["America/Santiago"]},{"dataType":"enum","enums":["America/Sao_Paulo"]},{"dataType":"enum","enums":["America/Toronto"]},{"dataType":"enum","enums":["America/Vancouver"]},{"dataType":"enum","enums":["Asia/Almaty"]},{"dataType":"enum","enums":["Asia/Ashkhabad"]},{"dataType":"enum","enums":["Asia/Bahrain"]},{"dataType":"enum","enums":["Asia/Bangkok"]},{"dataType":"enum","enums":["Asia/Chongqing"]},{"dataType":"enum","enums":["Asia/Dubai"]},{"dataType":"enum","enums":["Asia/Ho_Chi_Minh"]},{"dataType":"enum","enums":["Asia/Hong_Kong"]},{"dataType":"enum","enums":["Asia/Jakarta"]},{"dataType":"enum","enums":["Asia/Jerusalem"]},{"dataType":"enum","enums":["Asia/Karachi"]},{"dataType":"enum","enums":["Asia/Kathmandu"]},{"dataType":"enum","enums":["Asia/Kolkata"]},{"dataType":"enum","enums":["Asia/Kuwait"]},{"dataType":"enum","enums":["Asia/Manila"]},{"dataType":"enum","enums":["Asia/Muscat"]},{"dataType":"enum","enums":["Asia/Qatar"]},{"dataType":"enum","enums":["Asia/Riyadh"]},{"dataType":"enum","enums":["Asia/Seoul"]},{"dataType":"enum","enums":["Asia/Shanghai"]},{"dataType":"enum","enums":["Asia/Singapore"]},{"dataType":"enum","enums":["Asia/Taipei"]},{"dataType":"enum","enums":["Asia/Tehran"]},{"dataType":"enum","enums":["Asia/Tokyo"]},{"dataType":"enum","enums":["Atlantic/Reykjavik"]},{"dataType":"enum","enums":["Australia/ACT"]},{"dataType":"enum","enums":["Australia/Adelaide"]},{"dataType":"enum","enums":["Australia/Brisbane"]},{"dataType":"enum","enums":["Australia/Perth"]},{"dataType":"enum","enums":["Australia/Sydney"]},{"dataType":"enum","enums":["Europe/Amsterdam"]},{"dataType":"enum","enums":["Europe/Athens"]},{"dataType":"enum","enums":["Europe/Belgrade"]},{"dataType":"enum","enums":["Europe/Berlin"]},{"dataType":"enum","enums":["Europe/Bratislava"]},{"dataType":"enum","enums":["Europe/Brussels"]},{"dataType":"enum","enums":["Europe/Bucharest"]},{"dataType":"enum","enums":["Europe/Copenhagen"]},{"dataType":"enum","enums":["Europe/Dublin"]},{"dataType":"enum","enums":["Europe/Helsinki"]},{"dataType":"enum","enums":["Europe/Istanbul"]},{"dataType":"enum","enums":["Europe/Lisbon"]},{"dataType":"enum","enums":["Europe/London"]},{"dataType":"enum","enums":["Europe/Luxembourg"]},{"dataType":"enum","enums":["Europe/Madrid"]},{"dataType":"enum","enums":["Europe/Malta"]},{"dataType":"enum","enums":["Europe/Moscow"]},{"dataType":"enum","enums":["Europe/Oslo"]},{"dataType":"enum","enums":["Europe/Paris"]},{"dataType":"enum","enums":["Europe/Riga"]},{"dataType":"enum","enums":["Europe/Rome"]},{"dataType":"enum","enums":["Europe/Stockholm"]},{"dataType":"enum","enums":["Europe/Tallinn"]},{"dataType":"enum","enums":["Europe/Vilnius"]},{"dataType":"enum","enums":["Europe/Warsaw"]},{"dataType":"enum","enums":["Europe/Zurich"]},{"dataType":"enum","enums":["Pacific/Auckland"]},{"dataType":"enum","enums":["Pacific/Chatham"]},{"dataType":"enum","enums":["Pacific/Fakaofo"]},{"dataType":"enum","enums":["Pacific/Honolulu"]},{"dataType":"enum","enums":["Pacific/Norfolk"]},{"dataType":"enum","enums":["US/Mountain"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Timezone": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Etc/UTC"]},{"ref":"CustomTimezones"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SeriesFormat": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["price"]},{"dataType":"enum","enums":["volume"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "VisiblePlotsSet": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ohlcv"]},{"dataType":"enum","enums":["ohlc"]},{"dataType":"enum","enums":["c"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LibrarySymbolInfo": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "full_name": {"dataType":"string","required":true},
            "base_name": {"dataType":"array","array":{"dataType":"string"}},
            "ticker": {"dataType":"string"},
            "description": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
            "session": {"dataType":"string","required":true},
            "session_display": {"dataType":"string"},
            "holidays": {"dataType":"string"},
            "session_holidays": {"dataType":"string"},
            "corrections": {"dataType":"string"},
            "exchange": {"dataType":"string","required":true},
            "listed_exchange": {"dataType":"string","required":true},
            "timezone": {"ref":"Timezone","required":true},
            "format": {"ref":"SeriesFormat","required":true},
            "pricescale": {"dataType":"double","required":true},
            "minmov": {"dataType":"double","required":true},
            "fractional": {"dataType":"boolean"},
            "minmove2": {"dataType":"double"},
            "has_intraday": {"dataType":"boolean"},
            "supported_resolutions": {"dataType":"array","array":{"dataType":"refAlias","ref":"ResolutionString"},"required":true},
            "intraday_multipliers": {"dataType":"array","array":{"dataType":"string"}},
            "has_seconds": {"dataType":"boolean"},
            "has_ticks": {"dataType":"boolean"},
            "seconds_multipliers": {"dataType":"array","array":{"dataType":"string"}},
            "has_daily": {"dataType":"boolean"},
            "has_weekly_and_monthly": {"dataType":"boolean"},
            "has_empty_bars": {"dataType":"boolean"},
            "has_no_volume": {"dataType":"boolean"},
            "visible_plots_set": {"ref":"VisiblePlotsSet"},
            "volume_precision": {"dataType":"double"},
            "data_status": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["streaming"]},{"dataType":"enum","enums":["endofday"]},{"dataType":"enum","enums":["pulsed"]},{"dataType":"enum","enums":["delayed_streaming"]}]},
            "expired": {"dataType":"boolean"},
            "expiration_date": {"dataType":"double"},
            "sector": {"dataType":"string"},
            "industry": {"dataType":"string"},
            "currency_code": {"dataType":"string"},
            "original_currency_code": {"dataType":"string"},
            "unit_id": {"dataType":"string"},
            "original_unit_id": {"dataType":"string"},
            "unit_conversion_types": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UdfErrorResponse": {
        "dataType": "refObject",
        "properties": {
            "s": {"dataType":"enum","enums":["error"],"required":true},
            "errmsg": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UdfSearchSymbolsResponse": {
        "dataType": "refObject",
        "properties": {
            "s": {"dataType":"undefined"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TradeHistory": {
        "dataType": "refObject",
        "properties": {
            "s": {"dataType":"string","required":true},
            "t": {"dataType":"array","array":{"dataType":"double"},"required":true},
            "c": {"dataType":"array","array":{"dataType":"double"},"required":true},
            "o": {"dataType":"array","array":{"dataType":"double"},"required":true},
            "h": {"dataType":"array","array":{"dataType":"double"},"required":true},
            "l": {"dataType":"array","array":{"dataType":"double"},"required":true},
            "v": {"dataType":"array","array":{"dataType":"double"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/',
            ...(fetchMiddlewares<RequestHandler>(UDFController)),
            ...(fetchMiddlewares<RequestHandler>(UDFController.prototype.base)),

            function UDFController_base(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UDFController();


              const promise = controller.base.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/time',
            ...(fetchMiddlewares<RequestHandler>(UDFController)),
            ...(fetchMiddlewares<RequestHandler>(UDFController.prototype.time)),

            function UDFController_time(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UDFController();


              const promise = controller.time.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/config',
            ...(fetchMiddlewares<RequestHandler>(UDFController)),
            ...(fetchMiddlewares<RequestHandler>(UDFController.prototype.config)),

            function UDFController_config(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UDFController();


              const promise = controller.config.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/symbol_info',
            ...(fetchMiddlewares<RequestHandler>(UDFController)),
            ...(fetchMiddlewares<RequestHandler>(UDFController.prototype.symbol_info)),

            function UDFController_symbol_info(request: any, response: any, next: any) {
            const args = {
                    group: {"in":"query","name":"group","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UDFController();


              const promise = controller.symbol_info.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/symbols',
            ...(fetchMiddlewares<RequestHandler>(UDFController)),
            ...(fetchMiddlewares<RequestHandler>(UDFController.prototype.symbols)),

            function UDFController_symbols(request: any, response: any, next: any) {
            const args = {
                    symbol: {"in":"query","name":"symbol","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UDFController();


              const promise = controller.symbols.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/search',
            ...(fetchMiddlewares<RequestHandler>(UDFController)),
            ...(fetchMiddlewares<RequestHandler>(UDFController.prototype.search)),

            function UDFController_search(request: any, response: any, next: any) {
            const args = {
                    query: {"in":"query","name":"query","required":true,"dataType":"string"},
                    limit: {"in":"query","name":"limit","required":true,"dataType":"double"},
                    type: {"in":"query","name":"type","dataType":"string"},
                    exchange: {"in":"query","name":"exchange","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UDFController();


              const promise = controller.search.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/history',
            ...(fetchMiddlewares<RequestHandler>(UDFController)),
            ...(fetchMiddlewares<RequestHandler>(UDFController.prototype.history)),

            function UDFController_history(request: any, response: any, next: any) {
            const args = {
                    symbol: {"in":"query","name":"symbol","required":true,"dataType":"string"},
                    resolution: {"in":"query","name":"resolution","required":true,"dataType":"string"},
                    from: {"in":"query","name":"from","required":true,"dataType":"double"},
                    to: {"in":"query","name":"to","required":true,"dataType":"double"},
                    countback: {"in":"query","name":"countback","dataType":"double"},
                    currencyCode: {"in":"query","name":"currencyCode","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new UDFController();


              const promise = controller.history.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
