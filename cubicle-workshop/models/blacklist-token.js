const { model, Schema } = require("mongoose");

const blacklistTokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true
        }
    }
);

const BlacklistToken = model("BlacklistToken", blacklistTokenSchema);

module.exports = BlacklistToken;