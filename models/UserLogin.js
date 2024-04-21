const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },
        is_subscribed: {
            type: Boolean,
            default: false,
        },
        subscription_expiration_date: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
)

const UserLogin =
    mongoose.models.UserLogin ||
    mongoose.model('UserLogin', usersSchema, 'Login-Details')

module.exports = UserLogin
