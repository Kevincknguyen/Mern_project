const mongoose = require("mongoose")
const bcrypt = require('bcrypt');





const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name error: Name is required"],
        minlength: [4, "Name error: Name must be more than 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Email error: Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }

    },
    password: {
        type: String,
        required: [true, "Passowrd error: Password is required"],
        minlength: [4, "Password: Password must be more than 2 cahracters"]
    },
    dob: {
        type: Date,
        required: [true, "Date of birth error: Input valid date of birth"],
    },
    bio: {
        type: String,

    },
    points: {
        type: Number,
    },
    profile_image: {
        type: String,
    },
    tier_status: {
        tier1: {
            type: Boolean,
        },
        tier2: {
            type: Boolean,
        },
        tier3: {
            type: Boolean,
        }
    },
    subscriptions: {
        type: Array

    },
    emotes: {
        type: Array

    },
    settings: {
        type: Object

    },
}, { timestamps: true })

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});



const User = mongoose.model('User', UserSchema)

module.exports = User
