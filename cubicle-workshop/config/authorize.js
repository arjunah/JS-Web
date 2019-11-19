const { jwt } = require("./utils");
const { authCookieName } = require("./app-config");
const { checkIfUserExists } = require("./helpers");

function authorize (req, res, next) {
    let user;
    const token = req.cookies[authCookieName] || "";
    if (token !== "") {
        jwt.verifyToken(token).then(async (data) => {
            try {
                user = await checkIfUserExists(data.username);
                req.user = user;
                req.user.password = "";
                next();
            } catch (error) {
                next(error);
                return;
            }
        }).catch(error => {
            if (error.name === "TokenExpiredError") {
                res.redirect("/login");
                return;
            } else {
                res.redirect("/");
                next(error)
            }
        });
    } else {
        res.redirect("/login");
    }
}

module.exports = authorize;