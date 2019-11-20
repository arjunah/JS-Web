const cookieSecret = "Sup3rDup3rS3cr3t";
const jwtSecret = "secret";
const authCookieName = "auth-cookie";
const publicURLs = ["/", "/login", "/logout", "/register", "/about", "/search"];

module.exports = {
    cookieSecret,
    jwtSecret,
    authCookieName,
    publicURLs
}