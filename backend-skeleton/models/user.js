const { model, Schema } = require("mongoose");
const { validatePassword, isUsernameUnique } = require("./validators");
const bcrypt = require("bcrypt");
const saltRounds = 9;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required!"],
            minlength: [2, "The username must be at least two characters!"],
            validate: [isUsernameUnique, "This username has already been taken!"]
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
            validate: [validatePassword, "Password must be at least 8 characters and must contain at least 1 number!"]
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