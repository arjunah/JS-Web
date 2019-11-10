const { Cube, Accessory } = require("../models/models");

function getCubes () {
    return  Cube.find();
}

function getCubeDetails (cubeID) {
    return Cube.findById(cubeID);
}

function addCube (formData, next) {
     const newCube = new Cube(
         {
           name: formData.name,
           description: formData.description,
           imageURL: formData.imageURL,
           difficulty: formData.difficulty  
         }
     );

     newCube.save(function (error) {
         if (error) {
             next(error);
         }
     });
}

function addAccessory (formData, next) {
    
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
    getCubeDetails,
    addCube,
    validateSearch,
    searchCubes
}