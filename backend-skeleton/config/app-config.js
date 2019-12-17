const cookieSecret = "Sup3rDup3rS3cr3t";
const jwtSecret = "secret";
const cookieNames = {
    auth: "auth-cookie",
    message: "message"
}
const clientMessages = {
    register: "Registration successful!",
    logout: "Logout successful!",
    cubeCreated: "Cube created successfully!",
    cubeEdited: "Cube edited successfully!",
    cubeDeleted: "Cube deleted successfully!",
    accessoryAdded: "Accessory added successfully!",
    accessoryAttached: "Accessory attached successfully!"
}
const publicURLs = ["/", "/login", "/logout", "/register", "/about", "/search"];
const dbName = "CubesDB";

const env = process.env.NODE_ENV || "development";

const envConfig = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: `mongodb://localhost:27017/${dbName}`
    },
    production: {}
};

module.exports = {
    envConfig: envConfig[env],
    cookieSecret,
    jwtSecret,
    cookieNames,
    clientMessages,
    publicURLs
}