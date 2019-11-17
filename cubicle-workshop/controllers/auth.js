const { registerUser } = require("../config/helpers");

function register (req, res, next) {
    const method = req.method;

    switch (method) {

        case "GET":
            res.render("register");
            break;

        case "POST":
            const { username, password, repeatPassword } = req.body;
            registerUser(username, password, repeatPassword, next);
            res.redirect("/login");
    }

}

function login (req, res, next) {
    res.render("login");
}

function logout (req, res, next) {
    res.redirect("/");
}

module.exports = {
    register,
    login,
    logout
}