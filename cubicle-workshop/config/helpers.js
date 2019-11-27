const { Cube, Accessory, User, BlacklistToken } = require("../models");

function registerUser (username, password, repeatPassword, next) {
    if (password !== repeatPassword) {
        res.render("register");
        return;
    }

    const newUser = new User({ username, password });
    
    newUser.save(function (error) {
        if (error) {
            next(error);
        }
    });
}

function checkIfUserExists (username) {
    return User.findOne({ username });
}

function loginUser (user, password) {
    user.verifyPassword(password)
        .then(verified => {
            if (!verified) {
                res.render("login");
                return;
            }
        });
    return Promise.resolve(user);
}

function getCubes () {
    return  Cube.find();
}

function getCubeDetails (cubeID) {
    return Cube.findById(cubeID).populate("accessories");
}

function addCube (user, formData, next) {
     const newCube = new Cube(
         {
           name: formData.name,
           description: formData.description,
           imageURL: formData.imageURL,
           difficulty: formData.difficulty,  
           creatorID: user.username
         }
     );

     newCube.save(function (error) {
         if (error) {
             next(error);
         }
     });
}

function updateCube (cubeID, formData, next) {
    Cube.findByIdAndUpdate(cubeID, { ...formData }, function (error) {
        if (error) {
            next(error);
        }
    });
}

function removeCube(cubeID, next) {
    Cube.findByIdAndDelete(cubeID, function (error) {
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

function addCubeAccessory (formData, next) {
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
    });
}

function attachCubeAccessory (req, formData, next) {
    const accessoryID = formData.accessory;
    const cubeID = req.params.cubeID;

    Cube.findByIdAndUpdate(cubeID, { $push: { accessories: accessoryID }}, function (error) {
        if (error) {
            next(error)
        }
    });

    Accessory.findByIdAndUpdate(accessoryID, { $push: { cubes: cubeID } }, function (error) {
        if (error) {
            next(error)
        }
    });
}

function deleteCubeAccessory(req, next) {
    const accessoryID = req.params.accessoryID;
    const cubeID = req.params.cubeID;

    Cube.findByIdAndUpdate(cubeID, { $pull: { accessories: accessoryID }}, function (error) {
        if (error) {
            next(error)
        }
    });

    Accessory.findByIdAndUpdate(accessoryID, { $pull: { cubes: cubeID } }, function (error) {
        if (error) {
            next(error)
        }
    });
}

function blacklistToken (token, next) {
    const tokenToBlacklist = new BlacklistToken({ token });

    tokenToBlacklist.save(function (error) {
        if (error) {
            next(error);
        }
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

function selectDifficultyOption (cubeDifficulty, optionValue, options) {
    return cubeDifficulty === optionValue ? options.fn(this) : options.inverse(this);
}

module.exports = {
    registerUser,
    checkIfUserExists,
    loginUser,
    getCubes,
    getCubeDetails,
    addCube,
    updateCube,
    removeCube,
    getAccessories,
    addCubeAccessory,
    attachCubeAccessory,
    deleteCubeAccessory,
    blacklistToken,
    validateSearch,
    searchCubes,
    selectDifficultyOption
}