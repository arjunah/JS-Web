const { jwt } = require("./utils");
const { cookieNames, publicURLs } = require("./app-config");
const { checkIfUserExists } = require("./helpers");
const { BlacklistToken } = require("../models");

async function authorize (req, res, next) {
    
    let user;
    const token = req.cookies[cookieNames.auth] || "";
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
            // If token has expired, but the request is to a public URL
            if (publicURLs.includes(req.url)) {
                next();
                return;
            }
            if (error.name === "TokenExpiredError") {
                res.clearCookie(cookieNames.auth);
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