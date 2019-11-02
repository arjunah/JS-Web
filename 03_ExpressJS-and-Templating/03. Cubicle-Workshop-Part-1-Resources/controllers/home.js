const { getCubes } = require("../config/helpers");

module.exports = async function homeController (req, res, next) {

    const method = req.method;
    const cubes = await getCubes();

    switch (method) {
        case "GET":
            res.render("index", { cubes });
            break;

        case "POST":
            break;
    }
} 