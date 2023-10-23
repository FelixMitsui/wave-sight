
const mongoose = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true, 'Cannot create user without name '],
        unique: [true, 'the name already exists in database!'],
        minlength: 3,
        maxlength: 12

    }, user_email: {
        type: String,
        required: [true, 'Cannot create user without email '],
        unique: [true, 'email already exists in database!'],
        minlength: 15,
        maxlength: 25,
        lowercase: true,
        trim: true,

    }, user_password: {
        type: String,
        required: [true, 'Cannot create without password'],
        minlength: 8,
    },
    user_address: {
        type: String,
        default: ''
    },
    user_phone: {
        type: String,
        minlength: 10,
        maxlength: 10,
        default: null
    },
    user_auth: {
        type: Number,
        default: 0,
    },
    user_status: {
        type: Boolean,
        default: true
    },
    user_order: {
        type: Array,
        default: []
    },
    shopping_cart: {
        type: Array,
        default: []
    }, create_at: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('user', userSchema)
module.exports = { User }
