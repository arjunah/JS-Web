const { addCube, getCubeDetails, updateCube, removeCube } = require("../config/helpers");

function createCube (req, res, next) {
    const method = req.method;
    const user = req.user;

    switch (method) {
        case "GET":
            res.render("create", { user });
            break;
        case "POST":
            const formData = req.body;
            addCube(user, formData, next);
            res.redirect("/");
            break;
    }
}

async function deleteCube (req, res, next) {
    const method = req.method;
    const cubeID = req.params.cubeID;
    const user = req.user;

    switch (method) {
        case "GET":
            let cube;
            try {
                cube = await getCubeDetails(cubeID);
            } catch (error) {
                next(error);
            }
            res.render("delete-cube", { user, cube });
            break;
        case "POST":
            removeCube(cubeID, next);
            res.redirect("/");
    }
}

async function cubeDetails (req, res, next) {
    const cubeID = req.params.cubeID;
    const user = req.user;
    let cube;
    try {
        cube = await getCubeDetails(cubeID);
    } catch (error) {
        next(error);
    }
    const creator = cube.creatorID === req.user.username ? true : false;
    res.render("details", { user, cube, creator});
}

async function editCube (req, res, next) {
    const method = req.method;
    const user = req.user;
    const cubeID = req.params.cubeID;

    switch (method) {
        case "GET":
            let cube;
            try {
                cube = await getCubeDetails(cubeID);
            } catch (error) {
                next(error);
            }
            res.render("edit-cube", { cube, user });
            break;
        case "POST":
            const formData = req.body;
            updateCube(cubeID, formData, next);
            res.redirect(`/details/${cubeID}`);
            break;
    }
}

module.exports = {
    createCube,
    deleteCube,
    cubeDetails,
    editCube
}