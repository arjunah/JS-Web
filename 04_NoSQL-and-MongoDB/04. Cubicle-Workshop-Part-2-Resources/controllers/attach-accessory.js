const { getCubeDetails, getAccessories, attachAccessory } = require("../config/helpers");

module.exports = async function (req, res, next) {

    const method = req.method;

    switch (method) {
        case "GET":
            let cube;
            let accessories;

            try {
                cube = await getCubeDetails(req.params.id);
                accessories = await getAccessories(req.params.id, next);
            } catch (error) {
                next(error);
            }

            res.render("attach-accessory", { cube, accessories });
            break;

        case "POST":
            const formData = req.body;
            attachAccessory(req, formData, next);
            res.redirect("/details/" + req.params.id);
            break;
    }
}