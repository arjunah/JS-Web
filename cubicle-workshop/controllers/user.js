const { registerUser, checkIfUserExists, loginUser, blacklistToken } = require("../config/helpers");
const { jwt } = require("../config/utils");
const { authCookieName } = require("../config/app-config");

function register (req, res, next) {
    const method = req.method;

    switch (method) {

        case "GET":
            res.render("register");
            break;

        case "POST":
            const { username, password, repeatPassword } = req.body;
            registerUser(username, password, repeatPassword, res, next);
            break;
    }

}

async function login (req, res, next) {
    const method = req.method;

    switch (method) {

        case "GET":
            res.render("login");
            break;

        case "POST":
            const { username, password } = req.body;
            let user;
            try {
                user = await checkIfUserExists(username);
            } catch (error) {
                next(error);
            }
            loginUser(user, password)
            .then(async (user) => {
                const token = await jwt.createToken({ userID: user._id, username });
                res.cookie(authCookieName, token, { httpOnly: true }).redirect("/");
            }).catch(error => {
                next(error);
            }); 
            break;
    }
}

function logout (req, res, next) {
    const token = req.cookies[authCookieName];
    blacklistToken(token, next);
    res.clearCookie(authCookieName);
    res.redirect("/");
}

module.exports = {
    register,
    login,
    logout
}