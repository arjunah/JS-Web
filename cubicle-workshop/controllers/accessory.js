const { 
    addCubeAccessory, 
    getCubeDetails, 
    getAccessories, 
    attachCubeAccessory, 
    deleteCubeAccessory 
} = require("../config/helpers");

function addAccessory (req, res, next) {

    const method = req.method;

    switch (method) {
        case "GET":
            res.render("add-accessory", { user: req.user });
            break;
        
        case "POST":
            const formData = req.body;
            addCubeAccessory(formData, next);
            res.redirect("/");
            break;
    }  
}

async function attachAccessory (req, res, next) {

    const method = req.method;
    const cubeID = req.params.cubeID;

    switch (method) {
        case "GET":
            let cube;
            let accessories;

            try {
                cube = await getCubeDetails(cubeID);
                accessories = await getAccessories(cubeID, next);
            } catch (error) {
                next(error);
            }

            res.render("attach-accessory", { cube, accessories, user: req.user });
            break;

        case "POST":
            const formData = req.body;
            attachCubeAccessory(req, formData, next);
            res.redirect("/details/" + cubeID);
            break;
    }
}

function deleteAccessory (req, res, next) {
    deleteCubeAccessory(req, next);
    res.redirect("/");
}

module.exports = {
    addAccessory,
    attachAccessory,
    deleteAccessory
}