const { getCubeDetails, getAccessories, attachAccessory } = require("../config/helpers");

module.exports = async function (req, res, next) {

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

            res.render("attach-accessory", { cube, accessories });
            break;

        case "POST":
            const formData = req.body;
            attachAccessory(req, formData, next);
            res.redirect("/details/" + cubeID);
            break;
    }
}