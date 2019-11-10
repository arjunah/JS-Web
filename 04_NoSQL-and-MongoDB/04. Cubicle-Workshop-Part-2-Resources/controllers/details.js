const { getCubeDetails } = require("../config/helpers");

module.exports = async function detailsController (req, res, next) {
    const id = req.params.id;
    const cube = await getCubeDetails(id);
    res.render("details", { cube });
}