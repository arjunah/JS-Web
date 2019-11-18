const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 9;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    });

userSchema.methods = {
    verifyPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt.hash(this.password, saltRounds, (error, hash) => {
            if (error) {
                next(error);
                return;
            }
            this.password = hash;
            next();
        });
    }
    return;
});

const User = model("User", userSchema);

module.exports = User;