const { 
    homeController, 
    aboutController, 
    notFoundController, 
    createController, 
    detailsController, 
    searchController, 
    addAccessoryController } = require("../controllers/index"); 

module.exports = (app) => {
    app.get("/", homeController);

    app.get("/about", aboutController);

    app.get("/create", createController);
    app.post("/create", createController);

    app.get("/details/:id", detailsController);

    app.post("/search", searchController);

    app.get("/add-accessory", addAccessoryController);
    app.post("/add-accessory", addAccessoryController);

    app.get("*", notFoundController); // handles all other routes with 404; should be last
};