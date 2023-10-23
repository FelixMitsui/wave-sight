const { BSONType, Binary, ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    cid: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: [true, 'Cannot create product without name '],
        unique: [true, 'the name already exists in database!'],
    }, product_colors: {
        type: Array,
        required: true,
    }, product_sizes: {
        type: Array,
        required: true,
    },
    product_price: {
        type: Number,
        required: true

    }, product_imgs: {
        type: Array,
        required: true

    },
    product_content: {
        type: String,
        required: true
    },
    product_popularity: {
        type: Boolean,
        default: false
    },
    product_sale: {
        type: Boolean,
        default: true
    },
    product_discount: {
        type: Number,
        default: 1
    },
    create_at: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('product', productSchema)
module.exports = { Product }