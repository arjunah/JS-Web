const { jwt } = require("./utils");
const { authCookieName, publicURLs } = require("./app-config");
const { checkIfUserExists } = require("./helpers");
const { BlacklistToken } = require("../models");

async function authorize (req, res, next) {
    
    let user;
    const token = req.cookies[authCookieName] || "";
    let blacklistedToken;
    try {
        blacklistedToken = await BlacklistToken.findOne({ token });
    } catch (error) {
        next(error);
        return;
    }
    if (token !== "" && !blacklistedToken) {
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
            if (publicURLs.includes(req.url)) {
                next();
                return;
            }
            if (error.name === "TokenExpiredError") {
                res.clearCookie(authCookieName);
                res.redirect("/login");
                return;
            } else {
                res.redirect("/");
                next(error);
                return;
            }
        });
    } else {
        if (publicURLs.includes(req.url)) {
            next();
            return;
        }
        res.redirect("/login");
    }
}

module.exports = authorize;