"use strict";
var carwings = require("carwings2");
var https = require("https");

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body.username && req.body.password) {
        var client = new carwings.Client();
        client.login(req.body.username, req.body.password, (err, vehicle) => {
            if (err) {
                context.log(err);
                if (process.env["ifttt_ccerr_url"]) {
                    https.get(process.env["ifttt_ccerr_url"]);
                }
            } else {
                context.log("Requesting HVAC off");

                client.requestHvacOff(vehicle.vin, (statusErr, statusResponse) => {
                    if (statusErr) {
                        context.log(statusErr);
                        if (process.env["ifttt_ccerr_url"]) {
                            https.get(process.env["ifttt_ccerr_url"]);
                        }
                    } else {
                        context.log(statusResponse);
                        if (process.env["ifttt_ccoff_url"]) {
                            https.get(process.env["ifttt_ccoff_url"]);
                        }
                    }
                });
            }
        });
    }

    context.done(null, {});
};