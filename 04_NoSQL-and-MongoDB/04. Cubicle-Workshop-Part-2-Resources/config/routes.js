const { 
    homeController, 
    aboutController, 
    notFoundController, 
    createController, 
    detailsController, 
    searchController, 
    addAccessoryController,
    attachAccessoryController,
    deleteCubeAccessoryController } = require("../controllers/index"); 

module.exports = (app) => {
    app.get("/", homeController);

    app.get("/about", aboutController);

    app.get("/create", createController);
    app.post("/create", createController);

    app.post("/search", searchController);

    app.get("/add-accessory", addAccessoryController);
    app.post("/add-accessory", addAccessoryController);

    app.get("/details/:cubeID", detailsController);

    app.get("/attach-accessory/:cubeID", attachAccessoryController);
    app.post("/attach-accessory/:cubeID", attachAccessoryController);

    app.get("/delete-cube-accessory/:accessoryID&:cubeID", deleteCubeAccessoryController);

    app.get("*", notFoundController); // handles all other routes with 404; should be last
};