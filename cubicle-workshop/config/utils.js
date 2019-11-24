const jsonWebToken = require("jsonwebtoken");
const { jwtSecret } = require("./app-config");

const jwt = {
    createToken: function (data) {
            return new Promise((resolve, reject) => {
                jsonWebToken.sign(data, jwtSecret, { expiresIn: "10m" }, function (error, token) {
                    if (error) {
                        reject(error);
                        return;
                    } else {
                        resolve(token);
                    }
                });  
            })
        },
    verifyToken: function (token) {
        return new Promise ((resolve, reject) => {
            jsonWebToken.verify(token, jwtSecret, function (error, data) {
                if (error) {
                    reject(error);
                    return;
                } else {
                    resolve(data);
                }
            });
        })
    }
}

module.exports = {
    jwt
}