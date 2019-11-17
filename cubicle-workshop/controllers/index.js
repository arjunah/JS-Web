const homeController = require("./home");
const aboutController = require("./about");
const notFoundController = require("./not-found");
const createController = require("./create");
const detailsController = require("./details");
const searchController = require("./search"); 
const addAccessoryController = require("./add-accessory");
const attachAccessoryController = require("./attach-accessory");
const deleteCubeAccessoryController = require("./delete-cube-accessory");
const loginController = require("./login");
const logoutController = require("./logout");
const registerController = require("./register");
const editCubeController = require("./edit-cube");
const deleteCubeController = require("./delete-cube");

module.exports = {
    homeController, 
    aboutController, 
    notFoundController, 
    createController, 
    detailsController, 
    searchController, 
    addAccessoryController,
    attachAccessoryController,
    deleteCubeAccessoryController,
    loginController,
    logoutController,
    registerController,
    editCubeController,
    deleteCubeController
}