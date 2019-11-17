const { model, Schema } = require("mongoose");
const { validateURLProtocol } = require("./validators");

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

const Accessory = model("Accessory", accessorySchema);

module.exports = Accessory;