const { deleteCubeAccessory } = require("../config/helpers");

module.exports = function deleteCubeAccessoryController (req, res, next) {
    deleteCubeAccessory(req, next);
    res.redirect("/");
}