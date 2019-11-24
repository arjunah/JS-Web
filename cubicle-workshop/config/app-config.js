const cookieSecret = "Sup3rDup3rS3cr3t";
const jwtSecret = "secret";
const authCookieName = "auth-cookie";
const publicURLs = ["/", "/login", "/logout", "/register", "/about", "/search"];

const env = process.env.NODE_ENV || "development";

const envConfig = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: "mongodb://localhost:27017/CubesDB"
    },
    production: {}
};

module.exports = {
    envConfig: envConfig[env],
    cookieSecret,
    jwtSecret,
    authCookieName,
    publicURLs
}