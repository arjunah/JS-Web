const { getCubes } = require("../config/helpers");

module.exports = async function detailsController (req, res, next) {
    const cubes = await getCubes();
    const id = req.params.id;
    const cube = cubes.find(cube => {
        return cube.id == id;
    });
    res.render("details", { cube });
}