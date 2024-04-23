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
        subscription_type: {
            type: String, // Assuming subscription type will be a string (e.g., 'Beginner', 'Advanced', 'Premium')
            enum: ['Beginner', 'Advanced', 'Premium'], // Restrict possible values to these options
            default: null, // Default value can be set to null or a specific type if desired
        },
    },
    { timestamps: true }
)

const UserLogin =
    mongoose.models.UserLogin ||
    mongoose.model('UserLogin', usersSchema, 'Login-Details')

module.exports = UserLogin
