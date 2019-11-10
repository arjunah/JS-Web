const { addAccessory } = require("../config/helpers");

module.exports = function addAccessoryController (req, res, next) {

    const method = req.method;

    switch (method) {
        case "GET":
            res.render("add-accessory");
            break;
        
        case "POST":
            const formData = req.body;
            addAccessory(formData, next);
            res.redirect("/");
            break;
    }  
}