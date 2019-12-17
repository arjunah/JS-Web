const dbConnector = require("./config/database");
const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const { envConfig, cookieSecret } = require("./config/app-config");
const app = express();
const { clientErrorHandler } = require("./config/helpers");

dbConnector().then(() => {
    
    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser(cookieSecret));

    app.use("/static", express.static(path.join(__dirname, "/static"))); // serve static files

    app.engine(".hbs", handlebars({ extname: ".hbs", helpers: require("./config/helpers") }));
    app.set("view engine", ".hbs");
    // app.locals.layout = false; // disable layouts
    
    require("./config/routes")(app);
    
    app.listen(envConfig.port, console.log(`Listening on port ${envConfig.port}...`));
}).catch(error => clientErrorHandler(res, null, error, { user: req.user }));