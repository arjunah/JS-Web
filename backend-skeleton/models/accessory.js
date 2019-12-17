const { model, Schema } = require("mongoose");
const { validateURLProtocol } = require("./validators");

const accessorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Accessory name is required!"]
        },
        description: {
            type: String,
            required: [true, "Accessory description is required!"],
            maxlength: [500, "Description cannot be longer than 500 characters!"]
        },
        imageURL: {
            type: String,
            required: [true, "Image is required!"],
            validate: [validateURLProtocol, "The image URL is not valid!"]
        },
        cubes: [
            { 
                type: Schema.Types.ObjectId, 
                ref: "Cube"
            }
        ]
    });

const Accessory = model("Accessory", accessorySchema);

module.exports = Accessory;