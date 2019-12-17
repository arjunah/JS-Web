const { model, Schema } = require("mongoose");
const { validateURLProtocol } = require("./validators");

const cubeSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Cube name is required!"],
            minlength: [3, "The cube name must be at least 3 characters!"]
        },
        description: {
            type: String,
            required: [true, "Description is required!"],
            maxlength: [500, "Description cannot be longer than 500 characters!"]
        },
        imageURL: {
            type: String,
            required: [true, "Image is required!"],
            validate: [validateURLProtocol, "The image URL is not valid!"]
        },
        difficulty: {
            type: Number,
            min: [1, "Difficulty cannot be less than 1!"],
            max: [6, "Difficulty cannot be greater than 6!"]
        },
        accessories: [
            {
                type: Schema.Types.ObjectId,
                ref: "Accessory"
            }
        ],
        creatorID: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Could not set cube creator, please, try again!"]
        }
    });

const Cube = model("Cube", cubeSchema);

module.exports = Cube;