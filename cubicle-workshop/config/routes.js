const {
    home, 
    about, 
    notFound, 
    search,
    auth,
    cube,
    accessory
} = require("../controllers");

module.exports = (app) => {
    app.get("/", home);

    app.get("/login", auth.login);
    app.post("/login", auth.login);

    app.get("/logout", auth.logout);

    app.get("/register", auth.register);
    app.post("/register", auth.register);

    app.get("/about", about);

    app.get("/create", cube.createCube);
    app.post("/create", cube.createCube);

    app.post("/search", search);

    app.get("/add-accessory", accessory.addAccessory);
    app.post("/add-accessory", accessory.addAccessory);

    app.get("/details/:cubeID", cube.cubeDetails);

    app.get("/edit/:cubeID", cube.editCube);

    app.get("/delete/:cubeID", cube.deleteCube);

    app.get("/attach-accessory/:cubeID", accessory.attachAccessory);
    app.post("/attach-accessory/:cubeID", accessory.attachAccessory);

    app.get("/delete-cube-accessory/:accessoryID&:cubeID", accessory.deleteAccessory);

    app.get("*", notFound); // handles all other routes with 404; should be last
};