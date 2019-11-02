const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

module.exports = (app) => {

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/static", express.static(path.join(__dirname, "../static"))); // serve static files

    app.engine(".hbs", handlebars({ extname: ".hbs"}));
    app.set("view engine", ".hbs");
    app.locals.layout = false; // disable layouts
};