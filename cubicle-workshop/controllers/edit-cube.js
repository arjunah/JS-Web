const { getCubeDetails } = require("../config/helpers");

module.exports = async function editCubeController (req, res, next) {
    const method = req.method;

    switch (method) {
        case "GET":
            const cubeID = req.params.cubeID;
            let cube;
            try {
                cube = await getCubeDetails(cubeID);
            } catch (error) {
                next(error);
            }
            res.render("edit-cube", { cube });
            break;
    }
}