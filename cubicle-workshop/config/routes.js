const {
    home, 
    about, 
    notFound, 
    search,
    auth,
    cube,
    accessory
} = require("../controllers");

const authorize = require("./authorize");

module.exports = (app) => {
    app.get("/", authorize, home);

    app.get("/login", authorize, auth.login);
    app.post("/login", auth.login);

    app.get("/logout", authorize, auth.logout);

    app.get("/register", authorize, auth.register);
    app.post("/register", auth.register);

    app.get("/about", authorize, about);

    app.get("/create", authorize, cube.createCube);
    app.post("/create", cube.createCube);

    app.post("/search", search);

    app.get("/add-accessory", authorize, accessory.addAccessory);
    app.post("/add-accessory", accessory.addAccessory);

    app.get("/details/:cubeID", authorize, cube.cubeDetails);

    app.get("/edit/:cubeID", authorize, cube.editCube);

    app.get("/delete/:cubeID", authorize, cube.deleteCube);

    app.get("/attach-accessory/:cubeID", authorize, accessory.attachAccessory);
    app.post("/attach-accessory/:cubeID", accessory.attachAccessory);

    app.get("/delete-cube-accessory/:accessoryID&:cubeID", authorize, accessory.deleteAccessory);

    app.get("*", notFound); // handles all other routes with 404; should be last
};