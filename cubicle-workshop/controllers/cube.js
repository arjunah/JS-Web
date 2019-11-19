const { addCube, getCubeDetails } = require("../config/helpers");

function createCube (req, res, next) {

    const method = req.method;

    switch (method) {
        case "GET":
            res.render("create");
            break;
        case "POST":
            const formData = req.body;
            addCube(formData, next);
            res.redirect("/");
            break;
    }
}

async function deleteCube (req, res, next) {
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
            res.render("delete-cube", { cube });
            break;
    }
}

async function cubeDetails (req, res, next) {
    const cubeID = req.params.cubeID;
    let cube;
    try {
        cube = await getCubeDetails(cubeID);
    } catch (error) {
        next(error);
    }

    res.render("details", { cube });
}

async function editCube (req, res, next) {
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

module.exports = {
    createCube,
    deleteCube,
    cubeDetails,
    editCube
}