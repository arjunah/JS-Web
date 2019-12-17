const { 
    addCubeAccessory, 
    getCubeDetails, 
    getAccessories, 
    attachCubeAccessory, 
    deleteCubeAccessory,
    setClientCookie,
    clientErrorHandler 
} = require("../config/helpers");
const { cookieNames, clientMessages } = require("../config/app-config");

function addAccessory (req, res) {

    const method = req.method;
    const user = req.user;

    switch (method) {
        case "GET":
            res.render("add-accessory", { user });
            break;
        
        case "POST":
            const formData = req.body;
            addCubeAccessory(formData)
                .then(() => {
                    setClientCookie(res, cookieNames.message, clientMessages.accessoryAdded, { maxAge: 2000 })
                        .redirect("/");
                })
                .catch(error => {
                    clientErrorHandler(res, "add-accessory", error, { user });
                });
            break;
    }  
}

async function attachAccessory (req, res, next) {

    const method = req.method;
    const cubeID = req.params.cubeID;
    const user = req.user;

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

            const creator = cube.creatorID.equals(req.user._id) ? true : false;
            res.render("attach-accessory", { user, cube, accessories, creator });
            break;

        case "POST":
            const formData = req.body;
            attachCubeAccessory(cubeID, formData)
                .then(() => {
                    setClientCookie(res, cookieNames.message, clientMessages.accessoryAttached, { maxAge: 2000 })
                        .redirect("/details/" + cubeID);
                })
                .catch(error => {
                    clientErrorHandler(res, null, error, { user });
                });
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