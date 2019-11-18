const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");
const secret = require("./app-config").cookieSecret;

module.exports = (app) => {

    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser(secret));

    app.use("/static", express.static(path.join(__dirname, "../static"))); // serve static files

    app.engine(".hbs", handlebars({ extname: ".hbs", helpers: require("./helpers") }));
    app.set("view engine", ".hbs");
    // app.locals.layout = false; // disable layouts
};