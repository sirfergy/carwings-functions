"use strict";
var carwings = require("carwings3");
var https = require("https");

module.exports = async function (context, req) {
    context.log('Unlock request');

    if (req.body.vin && req.body.username && req.body.password && req.body.authorizationKey) {
        const { vin, username, password, authorizationKey } = req.body;
        const client = new carwings.Client(vin);
        try {
            await client.login(username, password);
            await client.unlockDoors(authorizationKey);
            if (process.env["ifttt_unlock_url"]) {
                https.get(process.env["ifttt_unlock_url"]);
            }
        } catch (ex) {
            context.log(ex);
            if (process.env["ifttt_unlockerr_url"]) {
                https.get(process.env["ifttt_unlockerr_url"]);
            }
        }
    }

    context.done(null, {});
};