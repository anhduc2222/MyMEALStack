/**
 * Created by vaduc on 7/19/2016.
 */
var version = require('express-route-versioning');
var cors = require('cors');

class RouteRegistration {
    static register(app) {
        console.log("enable core");
        app.use(cors());
        app.options('*', cors());  // include before other routes

        // API version handler setup
        version.use({
            header: 'Accept-Version',
            grab: /([0-9]*\.?[0-9]+)/,
            error: 406
        });

        app.use((req, res, next) => {
            // Set accept-version header to the latest if not set
            if (typeof req.headers['accept-version'] == 'undefined' || !req.headers['accept-version'])
                req.headers['accept-version'] = '1.0';
            next();
        }, version.reroute({
            1.0: require(__dirname + '/v1.0').register()
        }));

        // Catch-all middleware to return a 404 if no route
        app.use((req, res) => {
            res.status(404).end();
        });
    }
}

export = RouteRegistration;