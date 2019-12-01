const { Cube, Accessory, User, BlacklistToken } = require("../models");

// ERROR HANDLER
function clientErrorHandler(res, route, error, renderVariables) {
    if (error.name === "ValidationError") {
        res.render(route, { errors: error.errors, ...renderVariables });
    } else {
        res.render("500", { ...renderVariables });
    }
}

// USER
function registerUser(username, password, repeatPassword) {
    return new Promise((resolve, reject) => {
        if (password !== repeatPassword) {
            const repasswordError = {
                name: "ValidationError",
                errors: {
                    repassword: {
                        message: "Password and Repeat Password must be the same!"
                    }
                }
            }
            reject(repasswordError);
        }
    
        const newUser = new User({ username, password });
    
        newUser.save(function (error) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

async function loginUser(res, username, password) {
    let user;
    try {
        user = await checkIfUserExists(username);
    } catch (error) {
        clientErrorHandler(res, null, error);
    }
    if (!user) {
        const noSuchUserError = {
            name: "ValidationError",
            errors: {
                noSuchUser: {
                    message: "Invalid credentials!"
                }
            }
        }
        return Promise.reject(noSuchUserError);
    }
    return user.verifyPassword(password)
        .then(verified => {
            if (!verified) {
                const wrongPasswordError = {
                    name: "ValidationError",
                    errors: {
                        wrongPassword: {
                            message: "Invalid credentials!"
                        }
                    }
                }
                return Promise.reject(wrongPasswordError);
            } else {
                return Promise.resolve(user);
            }
        });
}

function checkIfUserExists(username) {
    return User.findOne({ username });
}

// CUBES
function getCubes() {
    return Cube.find();
}

function getCubeDetails(cubeID) {
    return Cube.findById(cubeID).populate("accessories");
}

function addCube(user, formData) {
    return new Promise ((resolve, reject) => {
        const newCube = new Cube(
            {
                name: formData.name,
                description: formData.description,
                imageURL: formData.imageURL,
                difficulty: formData.difficulty,
                creatorID: user._id
            }
        );
    
        newCube.save(function (error) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

function updateCube(cubeID, formData) {
    return Cube.findByIdAndUpdate(cubeID, { ...formData }, { runValidators: true }).exec();
}

function removeCube(cubeID) {
    return Cube.findByIdAndDelete(cubeID).exec();
}

// ACCESSORIES
async function getAccessories(cubeID) {
    // filter out the accessories attached to a cube
    return accessories = await Accessory.find().where("cubes").nin([cubeID]);
}

function addCubeAccessory(formData) {
    return new Promise ((resolve, reject) => {
        const newAccessory = new Accessory(
            {
                name: formData.name,
                description: formData.description,
                imageURL: formData.imageURL
            }
        );
    
        newAccessory.save(function (error) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

function attachCubeAccessory(cubeID, formData) {
    const accessoryID = formData.accessory;

    const cubePromise = Cube.findByIdAndUpdate(
        cubeID, 
        { $push: { accessories: accessoryID } }, 
        { runValidators: true })
        .exec();

    const accessoryPromise = Accessory.findByIdAndUpdate(
        accessoryID, 
        { $push: { cubes: cubeID } }, 
        { runValidators: true })
        .exec();
    
    return Promise.all([cubePromise, accessoryPromise]);
}

function deleteCubeAccessory(req, next) {
    const accessoryID = req.params.accessoryID;
    const cubeID = req.params.cubeID;

    Cube.findByIdAndUpdate(cubeID, { $pull: { accessories: accessoryID } }, function (error) {
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

// INVALID TOKENS
function blacklistToken(token, next) {
    const tokenToBlacklist = new BlacklistToken({ token });

    tokenToBlacklist.save(function (error) {
        if (error) {
            next(error);
        }
    });
}

// SEARCH
function validateSearch(from, to) {
    return new Promise ((resolve, reject) => {
        if ((from && from < 1) || (to && (to < 1 || to < from))) {
            const searchError = {
                name: "ValidationError",
                errors: {
                    search: {
                        message: "Invalid search input!"
                    }
                }
            }
            reject(searchError);
        } else {
            resolve();
        }
    });
}

function searchCubes(searchString, from, to, allCubes) {
    if (from === "") {
        from = 1;
    }
    if (to === "") {
        to = Number.MAX_SAFE_INTEGER;
    }
    return allCubes.filter(cube => {
        return ((cube.name.toLowerCase().includes(searchString.toLowerCase()) ||
            cube.description.toLowerCase().includes(searchString.toLowerCase())) &&
            Number(cube.difficulty) >= Number(from) &&
            Number(cube.difficulty) <= Number(to));
    });
}

// OTHER

// Selects the current cube difficulty from the select menu when editing or deleting a cube
function selectDifficultyOption(cubeDifficulty, optionValue, options) {
    return cubeDifficulty === optionValue ? options.fn(this) : options.inverse(this);
}

// Sets client cookies for authentication and notification purposes
function setClientCookie (res, cookieName, content, options) {
    return res.cookie(cookieName, content, options);
}

module.exports = {
    clientErrorHandler,
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
    selectDifficultyOption,
    setClientCookie
}