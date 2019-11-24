const {
    home, 
    about, 
    notFound, 
    search,
    user,
    cube,
    accessory
} = require("../controllers");

const authorize = require("./authorize");

module.exports = (app) => {
    app.get("/", authorize, home);

    app.get("/login", authorize, user.login);
    app.post("/login", user.login);

    app.get("/logout", user.logout);

    app.get("/register", authorize, user.register);
    app.post("/register", user.register);

    app.get("/about", authorize, about);

    app.get("/create", authorize, cube.createCube);
    app.post("/create", authorize, cube.createCube);

    app.post("/search", authorize, search);

    app.get("/add-accessory", authorize, accessory.addAccessory);
    app.post("/add-accessory", authorize, accessory.addAccessory);

    app.get("/details/:cubeID", authorize, cube.cubeDetails);

    app.get("/edit/:cubeID", authorize, cube.editCube);
    app.post("/edit/:cubeID", authorize, cube.editCube);

    app.get("/delete/:cubeID", authorize, cube.deleteCube);

    app.get("/attach-accessory/:cubeID", authorize, accessory.attachAccessory);
    app.post("/attach-accessory/:cubeID", authorize, accessory.attachAccessory);

    app.get("/delete-cube-accessory/:accessoryID&:cubeID", authorize, accessory.deleteAccessory);

    app.get("*", authorize, notFound); // handles all other routes with 404; should be last
};