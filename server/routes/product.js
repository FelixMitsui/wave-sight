const express = require("express");
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId;
const productRouter = express.Router()
const { Product } = require('../models/product')
const { handleFileUploads, deleteUploadedImg } = require('../utils/fire-base')


productRouter.post('/api/products', handleFileUploads, (req, res) => {

  const product = new Product(req.body);

  product.save((err, result) => {

    if (err) {
      console.error(err);
      return;
    }

    if (!result) {
      res.status(404).send('Error occurred while creating.');
      return;
    }
    res.status(200).json(result);
  })
});

productRouter.put('/api/products/:id', handleFileUploads, (req, res) => {

  Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {

    if (err) {
      console.error(err)

      return
    }
    if (!result) {
      res.status(404).send('Update failed.');
      return;
    }
    res.status(200).json(result);
  })
})

productRouter.get("/api/products", (req, res) => {

  const query = {};

  let needValues = '';

  const currentPage = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skipIndex = (currentPage - 1) * limit;

  if (req.query.q) {

    needValues = '-product_colors -product_sizes -product_content -create_at';

    query.product_name = new RegExp(req.query.q, "i");

  } else if (req.query.cid) {

    needValues = '-product_colors -product_sizes -product_content -create_at';

    const cid = new RegExp(`^${req.query.cid.replace(/0+$/, '')}`);
    query.cid = { $regex: cid };

  } else {

    needValues = '-product_colors -product_sizes -product_content';
  }

  Product.countDocuments(query, (err, count) => {

    if (err) {
      console.error(err);
      return;
    }

    const totalPage = Math.ceil(count / limit);

    Product.find(query)
      .skip(skipIndex)
      .limit(limit)
      .select(needValues)
      .exec((err, result) => {
        if (err) {
          console.error(err)
          return
        }
        if (!result) {
          res.status(404).send('No related products found.')
        }

        res.status(200).json({ items: result, totalPage });
      })
  });
});

productRouter.get("/api/products/:id", (req, res) => {

  Product.findOne({ _id: req.params.id }, (err, result) => {

    if (err) {
      console.error(err)
      return
    }

    res.status(200).json(result)
  })
})

productRouter.get("/api/carousel", (req, res) => {

  const needValues = '-product_colors -product_sizes -product_content -create_at';

  Product.find({ product_popularity: true })
    .sort({ create_time: -1 })
    .limit(10)
    .select(needValues)
    .exec((err, popularityItems) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      Product.find({ product_discount: { $lt: 1 } })
        .sort({ create_time: -1 })
        .limit(10)
        .select(needValues)
        .exec((err, discountItems) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }

          Product.find({})
            .sort({ create_time: -1 })
            .limit(10)
            .select(needValues)
            .exec((err, newItems) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
              }

              res.status(200).json({
                popularityItems,
                discountItems,
                newItems,
              });
            });
        });
    });
});


productRouter.patch('/api/products/:id/img', deleteUploadedImg, (req, res) => {
  console.log("req.params.id");


  Product.findByIdAndUpdate({ _id: req.params.id }, { $pull: { product_imgs: req.body.imgFile } }, (err, result) => {

    if (err) {

      return res.status(500).send(`${err}`);
    }

    if (!result) {
      return res.status(404).send("Deletion not completed.");
    }

    return res.status(200).send("Deletion completed.");

  })

});

module.exports = productRouter;