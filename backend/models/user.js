
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
        maxlength: 16,


    },
    user_address: {
        type: String,
        default: ''

    },
    user_role: {
        type: String,
        default: 'normal',
    },
    user_status: {
        type: Number,
        default: 1

    }, shopping_cart: {
        type: Array,
        default: []

    }, create_time: {
        type: Date,
        default: Date.now

    }
})

const User = mongoose.model('user', userSchema)
module.exports = { User }

// async function createUser(parms) {
//     const salt = await bcrypt.genSalt(10)
//     const pass = await bcrypt.hash(parms.password, salt)
//     const user = await User.create({
//         username: parms.username,
//         email: parms.email,
//         password: pass,
//         role: parms.role,
//         status: parms.status,
//         shoppingCart: parms.shoppingCart
//     })


// }

// const validateUser = (user) => {
//     const schema = Joi.object({
//         username: Joi.string()
//             .min(4)
//             .max(12)
//             .required()
//             .error(new Error('用户名不符合验证規則')),
//         email: Joi.string()
//             .email()
//             .required()
//             .error(new Error('邮箱格式不符合要求')),
//         password: Joi.string()
//             .regex(/^[a-zA-Z0-9]{8,16}$/)
//             .required()
//             .error(new Error('密码格式不符合要求')),
//         role: Joi.string()
//             .valid('normal', 'admin')
//             .required()
//             .error(new Error('角色值非法')),
//         status: Joi.number()
//             .valid(0, 1)
//             .required()
//             .error(new Error('状态值非法'))
//     })
//     return schema.validate(user)
// }

// async function createUserTestData() {
//     for (let i = 0; i < 5; i++) {
//         await createUser({
//             username: `test0${i}`,
//             email: `test0${i}@gmail.com`,
//             password: `AA345678`,
//             role: i % 2 == 0 ? 'admin' : 'user',
//             status: 0
//         })
//     }
// }

// createUserTestData()

// module.exports = {
//     user, validateUser
// }