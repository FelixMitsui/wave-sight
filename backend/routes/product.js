const express = require("express");
require('mongoose')
const productRouter = express.Router()

const fs = require('fs');
const { Product } = require('../models/product')
const uploadFile = require('../utils/multer-config')
const ObjectId = require("mongodb").ObjectId;

productRouter.post("/getFilteredProducts", function (req, res) {

  Product.find({ $or: [{ product_new: true }, { product_popularity: true }, { product_discount: { $lt: 1 } }] }, function (err, result) {
    if (err) throw err
    res.send({ result }, 200);
  })
});
productRouter.post("/getAllProducts", function (req, res) {

  Product.find({}, function (err, result) {
    if (err) throw err
    res.send({ result }, 200);
  })
});

productRouter.get("/product/:category", function (req, res) {
  const { category } = req.params
  console.log(category)
  Product.find({ product_categories: category }, function (err, result) {
    if (err) throw err;
    res.send({ result }, 200);
  })
});



productRouter.get("/detail/:id", function (req, res) {
  Product.findOne({
    _id: ObjectId(req.params.id)
  }, function (err, result) {
    if (err) throw err
    res.json({ result })

  }
  )
})

productRouter.post('/createProduct', uploadFile, function (req, res) {

  let product = new Product({
    product_name: req.body.productName,
    product_colors: req.body.productColors,
    product_sizes: req.body.productSizes,
    product_categories: req.body.productCategories,
    product_part: req.body.productPart,
    product_price: req.body.productPrice,
    product_sale: req.body.productSale,
    product_new: req.body.productNew,
    product_hot: req.body.productHot,
    product_imgs: req.files.productImgs,
    product_content: req.body.productContent,
    product_detail_imgs: req.files.productDetailImgs
  })
  product.save(function (err, result) {

    if (err) {
      console.log("create" + err)
    }

    if (!result) {
      let productUpdate = {
        product_name: req.body.productName,
        product_colors: req.body.productColors,
        product_sizes: req.body.productSizes,
        product_categories: req.body.productCategories,
        product_part: req.body.productPart,
        product_price: req.body.productPrice,
        product_sale: req.body.productSale,
        product_new: req.body.productNew,
        product_hot: req.body.productHot,
        product_imgs: req.files.productImgs,
        product_content: req.body.productContent,
        product_detail_imgs: req.files.productDetailImgs
      }

      Product.findByIdAndUpdate({ _id: req.body.productId }, productUpdate, { new: true }, function (err, result) {
        if (err) console.log(err)
      })
    }
  })
})

productRouter.get('/search', function (req, res) {

  Product.find({ product_name: { $regex: `${req.query.q}`, $options: "$i" } }, function (err, result) {
    if (err) console.log(err)

    res.json({ result }, 200)

    console.log(result)
  })


})

// let newPath = `public/imgs/shirt/${req.file.originalname}`
// fs.rename(req.file.path, newPath, () => {
//   res.json({ result: 'image uploaded successful' })
// })

// let product = new Product({

//   product_name: req.body.productName,
//   product_colors: req.body.productColors,
//   product_sizes: req.body.productSizes,
//   product_categories: req.body.productCategories,
//   product_part: req.body.productPart,
//   product_price: req.body.productPrice,
//   product_imgs: req.body.productImgs,
//   product_content: req.body.productContent,
//   product_detail_imgs: req.body.productDetailImgs
// });

// product.save(function (err, result) {
//   if (err) {
//     console.log(err)
//     throw err

//   }
//   res.json({ result: { result } })
//   console.log(`'ProductData:'${result}`)
// })


module.exports = productRouter;