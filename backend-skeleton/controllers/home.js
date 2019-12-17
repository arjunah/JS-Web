const { getCubes } = require("../config/helpers");
const { cookieNames } = require("../config/app-config");

module.exports = async function home (req, res, next) {
    const method = req.method;
    const user = req.user;

    let cubes;
    try {
        cubes = await getCubes();
    } catch (error) {
        next(error);
    }

    switch (method) {
        case "GET":
            const message = req.cookies[cookieNames.message] || null;
            res.render("index", { user, cubes, message });
            break;
    }
} 