const homeController = require("../controllers/home");
const aboutController = require("../controllers/about");
const notFoundController = require("../controllers/not-found");
const createController = require("../controllers/create");
const detailsController = require("../controllers/details");

module.exports = (app) => {
    app.get("/", homeController);

    app.get("/about", aboutController);

    app.get("/create", createController);

    app.get("/details/:id", detailsController);

    app.get("*", notFoundController); // handles all other routes with 404; should be last
};