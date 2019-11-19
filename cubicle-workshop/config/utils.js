const jsonWebToken = require("jsonwebtoken");
const secret = require("./app-config").jwtSecret;

const jwt = {
    createToken: function (data) {
            return new Promise((resolve, reject) => {
                jsonWebToken.sign(data, secret, { expiresIn: "10m" }, function (error, token) {
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
            jsonWebToken.verify(token, secret, { expiresIn: "10m" }, function (error, data) {
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