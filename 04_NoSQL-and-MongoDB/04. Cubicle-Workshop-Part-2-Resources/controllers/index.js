const homeController = require("../controllers/home");
const aboutController = require("../controllers/about");
const notFoundController = require("../controllers/not-found");
const createController = require("../controllers/create");
const detailsController = require("../controllers/details");
const searchController = require("../controllers/search"); 
const addAccessoryController = require("../controllers/add-accessory");
const attachAccessoryController = require("../controllers/attach-accessory");
const deleteCubeAccessoryController = require("../controllers/delete-cube-accessory");

module.exports = {
    homeController, 
    aboutController, 
    notFoundController, 
    createController, 
    detailsController, 
    searchController, 
    addAccessoryController,
    attachAccessoryController,
    deleteCubeAccessoryController
}