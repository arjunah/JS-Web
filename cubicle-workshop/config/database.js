const mongoose = require("mongoose");
const { envConfig } = require("./app-config");

module.exports = () => {
    return mongoose.connect(envConfig.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
}