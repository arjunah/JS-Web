const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const cubeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            maxlength: 500
        },
        imageURL: {
            type: String,
            required: true,
            validate: [validateURLProtocol, "The image URL is not valid!"]
        },
        difficulty: {
            type: Number,
            min: [1, "Difficulty cannot be less than 1!"],
            max: [10, "Difficulty cannot be greater than 10!"]
        },
        accessories: [
            {
                type: Schema.Types.ObjectId,
                ref: "Accessory"
            }
        ],
        creatorID: {
            type: String,
            required: true
        }
    });

const accessorySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            maxlength: 500
        },
        imageURL: {
            type: String,
            required: true,
            validate: [validateURLProtocol, "The image URL is not valid!"]
        },
        cubes: [
            { 
                type: Schema.Types.ObjectId, 
                ref: "Cube" 
            }
        ]
    });

function validateURLProtocol(url) {
    return (url.startsWith("http://") || url.startsWith("https://")) ? true : false
}

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

const Cube = model("Cube", cubeSchema);
const Accessory = model("Accessory", accessorySchema);
const User = model("User", userSchema);

module.exports = {
    Cube,
    Accessory,
    User
}