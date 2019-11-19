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
    app.get("/", home);

    app.get("/login", auth.login);
    app.post("/login", auth.login);

    app.get("/logout", auth.logout);

    app.get("/register", auth.register);
    app.post("/register", auth.register);

    app.get("/about", about);

    app.get("/create", authorize, cube.createCube);
    app.post("/create", authorize, cube.createCube);

    app.post("/search", search);

    app.get("/add-accessory", authorize, accessory.addAccessory);
    app.post("/add-accessory", authorize, accessory.addAccessory);

    app.get("/details/:cubeID", authorize, cube.cubeDetails);

    app.get("/edit/:cubeID", authorize, cube.editCube);

    app.get("/delete/:cubeID", authorize, cube.deleteCube);

    app.get("/attach-accessory/:cubeID", authorize, accessory.attachAccessory);
    app.post("/attach-accessory/:cubeID", authorize, accessory.attachAccessory);

    app.get("/delete-cube-accessory/:accessoryID&:cubeID", authorize, accessory.deleteAccessory);

    app.get("*", notFound); // handles all other routes with 404; should be last
};