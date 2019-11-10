const { getCubeDetails } = require("../config/helpers");

module.exports = async function detailsController (req, res, next) {
    const cubeID = req.params.id;
    let cube;
    try {
        cube = await getCubeDetails(cubeID);
    } catch (error) {
        next(error);
    }
    res.render("details", { cube, cubeID });
}