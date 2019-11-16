const { addCube } = require("../config/helpers");

module.exports = function createController (req, res, next) {

    const method = req.method;

    switch (method) {
        case "GET":
            res.render("create");
            break;
        case "POST":
            const formData = req.body;
            addCube(formData, next);
            res.redirect("/");
            break;
    }
}