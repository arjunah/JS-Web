const { addCube } = require("../config/helpers");

module.exports = async function createController (req, res, next) {

    const method = req.method;

    switch (method) {
        case "GET":
            res.render("create");
            break;
        case "POST":
            const formData = req.body;
            await addCube(formData);
            res.redirect("/");
            break;
    }
}