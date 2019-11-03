const path = require("path");
const fs = require("fs");
const Cube = require("../models/cube");

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

function addCube (formData) {
    return new Promise ((resolve, reject) => {
        let cubes;
        getCubes().then(cubes => {
            cubes = cubes;
            const { name, description, imageURL, difficulty } = formData;
            const newCube = new Cube(cubes.length + 1, name, description, imageURL, difficulty);
            cubes.push(newCube);

            fs.writeFile(path.join(__dirname, "database.json"), JSON.stringify(cubes), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }).catch(err => console.log(err));     
    }); 
}

function validateSearch (res, from, to) {
    if ((from && from < 1) || (to && (to < 1 || to < from))) {
        res.redirect("/");
        return false;
    } else {
        return true;
    }
}

function searchCubes (search, from, to, allCubes) {
    if (from === "") {
        from = 1;
    }
    if (to === "") {
        to = Number.MAX_SAFE_INTEGER;
    }
    return allCubes.filter(cube => {
        return ((cube.name.toLowerCase().includes(search.toLowerCase()) || 
                cube.description.toLowerCase().includes(search.toLowerCase())) && 
                Number(cube.difficulty) >= Number(from) && 
                Number(cube.difficulty) <= Number(to));
    });
}

module.exports = {
    getCubes,
    addCube,
    validateSearch,
    searchCubes
}