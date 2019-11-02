const path = require("path");
const fs = require("fs");

function getCubes () {
    return new Promise ((resolve, reject) => {
        let cubes;
        fs.readFile(path.join(__dirname, "database.json"), (err, data) => {
            if (err) {
                reject(err);
            } else {
                cubes = JSON.parse(data);
                resolve(cubes);
            }
        });
    });
}

module.exports = {
    getCubes
}