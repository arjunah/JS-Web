const { model, Schema } = require("mongoose");
const { validateURLProtocol } = require("./validators");

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

const Cube = model("Cube", cubeSchema);

module.exports = Cube;