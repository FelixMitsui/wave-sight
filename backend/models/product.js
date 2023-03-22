const { BSONType, Binary, ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

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
    product_categories: {
        type: Array,
        required: true
    },
    product_part: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true

    }, product_images: {
        type: Array,
        required: true

    },
    product_content: {
        type: String,
        required: true
    },
    product_detail_images: {
        type: Array
    },
    product_new: {
        type: Boolean,
        default: null
    },
    product_popularity: {
        type: Boolean,
        default: null
    },
    product_sale: {
        type: Boolean,
        default: null
    },
    product_discount: {
        type: Number,
        default: 1.0
    },
    create_time: {
        type: Date,
        default: Date.now

    }
})

const Product = mongoose.model('product', productSchema)
module.exports = { Product }