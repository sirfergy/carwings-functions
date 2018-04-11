import { Service } from "carwings3";
import * as https from "https";

export async function index(context, req) {
    context.log("Start HVAC off request");

    if (req.body.vin && req.body.username && req.body.password) {
        const errorHandler = (error) => {
            context.log(error);
            if (process.env["ifttt_ccerr_url"]) {
                https.get(process.env["ifttt_ccerr_url"]);
            }
        };
        const { vin, username, password } = req.body;
        const service = new Service(vin);
        await service.login(username, password);
        await service.deactivateHvac();
        if (process.env["ifttt_ccoff_url"]) {
            https.get(process.env["ifttt_ccoff_url"]);
        }

        return {
            status: 200
        };
    } else {
        return {
            status: 400
        }
    }
}
