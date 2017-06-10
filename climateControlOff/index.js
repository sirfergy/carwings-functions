"use strict";
var carwings = require("carwings2");

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body.username && req.body.password) {
        var client = new carwings.Client();
        client.login(req.body.username, req.body.password, (err, vehicle) => {
            if (err) {
                context.log(err);
            }
            else {
                context.log("Requesting HVAC off");

                client.requestHvacOff(vehicle.vin, (statusErr, statusResponse) => {
                    if (statusErr) {
                        context.log(statusErr);
                    }
                    else {
                        context.log(statusResponse);
                    }
                });
            }
        });
    }
    
    context.done(null, {});
};