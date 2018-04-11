"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const carwings3_1 = require("carwings3");
const https = require("https");
function index(context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        context.log("Start HVAC on request");
        if (req.body.vin && req.body.username && req.body.password) {
            const errorHandler = (error) => {
                context.log(error);
                if (process.env["ifttt_ccerr_url"]) {
                    https.get(process.env["ifttt_ccerr_url"]);
                }
            };
            const { vin, username, password } = req.body;
            const service = new carwings3_1.Service(vin);
            yield service.login(username, password);
            yield service.activateHvac();
            if (process.env["ifttt_ccon_url"]) {
                https.get(process.env["ifttt_ccon_url"]);
            }
            return {
                status: 200
            };
        }
        else {
            return {
                status: 400
            };
        }
    });
}
exports.index = index;
//# sourceMappingURL=index.js.map