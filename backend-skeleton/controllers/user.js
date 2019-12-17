const { 
    registerUser, 
    loginUser, 
    blacklistToken, 
    clientErrorHandler, 
    setClientCookie 
} = require("../config/helpers");
const { jwt } = require("../config/utils");
const { cookieNames, clientMessages } = require("../config/app-config");

function register (req, res) {
    const method = req.method;

    switch (method) {

        case "GET":
            res.render("register");
            break;

        case "POST":
            const { username, password, repeatPassword } = req.body;
            registerUser(username, password, repeatPassword)
                .then(() => {
                    setClientCookie(res, cookieNames.message, clientMessages.register, { maxAge: 2000 })
                        .redirect("/login");
                })
                .catch(error => {
                    clientErrorHandler(res, "register", error);
                    return;
                });
            
            break;
    }

}

async function login (req, res) {
    const method = req.method;

    switch (method) {

        case "GET":
            const message = req.cookies[cookieNames.message] || null;
            res.render("login", { message });
            break;

        case "POST":
            const { username, password } = req.body;
            
            loginUser(res, username, password)
            .then(async (user) => {
                try {
                    token = await jwt.createToken({ userID: user._id, username });
                    setClientCookie(res, cookieNames.auth, token, { httpOnly: true }).redirect("/");
                } catch (error) {
                    clientErrorHandler(res, null, error);
                }
            }).catch(error => {
                clientErrorHandler(res, "login", error);
            }); 
            break;
    }
}

async function logout (req, res, next) {
    try {
        const token = req.cookies[cookieNames.auth];
        blacklistToken(token, next);
        res.clearCookie(cookieNames.auth);
        setClientCookie(res, cookieNames.message, clientMessages.logout, { maxAge: 2000 })
            .redirect("/");
    } catch (error) {
        clientErrorHandler(res, null, error);
        return;
    }
}

module.exports = {
    register,
    login,
    logout
}