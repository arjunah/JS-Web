const { Cube, Accessory } = require("../models/models");

function getCubes () {
    return  Cube.find();
}

function getCubeDetails (cubeID) {
    return Cube.findById(cubeID).populate("accessories");
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

async function getAccessories (cubeID, next) {
    let accessories;
    try {               // filter out the accessories attached to a cube
        accessories = await Accessory.find().where("cubes").nin([cubeID]);
    } catch (error) {
        next(error)
    }
    return accessories;
}

function addAccessory (formData, next) {
    const newAccessory = new Accessory(
        {
            name: formData.name,
            description: formData.description,
            imageURL: formData.imageURL
        }
    );

    newAccessory.save(function (error) {
        if (error) {
            next(error);
        }
    })
}

function attachAccessory (req, formData, next) {
    const accessoryID = formData.accessory;
    const cubeID = req.params.cubeID;

    Cube.findByIdAndUpdate(cubeID, { $push: { accessories: accessoryID }}, function (error) {
        if (error) {
            next(error)
        }
    })

    Accessory.findByIdAndUpdate(accessoryID, { $push: { cubes: cubeID } }, function (error) {
        if (error) {
            next(error)
        }
    })
}

function deleteCubeAccessory(req, next) {
    const accessoryID = req.params.accessoryID;
    const cubeID = req.params.cubeID;

    Cube.findByIdAndUpdate(cubeID, { $pull: { accessories: accessoryID }}, function (error) {
        if (error) {
            next(error)
        }
    })

    Accessory.findByIdAndUpdate(accessoryID, { $pull: { cubes: cubeID } }, function (error) {
        if (error) {
            next(error)
        }
    })
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

function selectDifficultyOption (cubeDifficulty, optionValue, options) {
    return cubeDifficulty === optionValue ? options.fn(this) : options.inverse(this);
}

module.exports = {
    getCubes,
    getCubeDetails,
    addCube,
    getAccessories,
    addAccessory,
    attachAccessory,
    deleteCubeAccessory,
    validateSearch,
    searchCubes,
    selectDifficultyOption
}