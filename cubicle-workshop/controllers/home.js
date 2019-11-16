const { getCubes } = require("../config/helpers");

module.exports = async function homeController (req, res, next) {

    const method = req.method;
    let cubes;
    try {
        cubes = await getCubes();
    } catch (error) {
        next(error);
    }

    switch (method) {
        case "GET":
            res.render("index", { cubes });
            break;
    }
} 