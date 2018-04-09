"use strict";
var carwings = require("carwings3");
var https = require("https");

module.exports = function (context, req) {
    context.log('Start unlock request');

    if (req.body.vin && req.body.username && req.body.password && req.body.authorizationKey) {
        const errorHandler = (error) => {
            context.log(error);
            if (process.env["ifttt_unlockerr_url"]) {
                https.get(process.env["ifttt_unlockerr_url"]);
            }
        };
        const { vin, username, password, authorizationKey } = req.body;
        const service = new carwings.Service(vin);
        service.login(username, password).then(() => {
            return service.unlockDoors(authorizationKey);
        }, errorHandler).then(() => {
            if (process.env["ifttt_unlock_url"]) {
                https.get(process.env["ifttt_unlock_url"]);
            }
        }, errorHandler);
    }

    context.done(null, {});
};