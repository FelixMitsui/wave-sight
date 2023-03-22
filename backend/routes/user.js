const express = require("express");
const mongoose = require('mongoose')
const authentication = require("../utils/auth")
const userRouter = express.Router()
const { generateAccessToken } = require('../utils/token-generator')
const { User } = require("../models/user");
// mongoose.set('debug', true)
var path = require('path');

userRouter.route('/checkUserAuth').post(authentication, function (req, res) {
  console.log(req.decoded.user.user_email)
  User.findOne({ user_email: req.decoded.user.user_email }, function (err, result) {
    if (err) throw err
    res.send({ result })
  })

}
);
userRouter.post('/login', function (req, res) {

  const userInfo = {
    user_email: req.body.email,
    user_password: req.body.password
  }

  User.findOne(userInfo, function (err, result) {
    console.log(result)
    if (result === null) {
      res.status(404).send({ msg: 'Incorrect Password or Email' })
    }
    else {
      const userToken = {
        user_id: result._id,
        user_name: result.user_name,
        user_email: result.user_email,
        user_role: result.user_role,
        user_address: result.user_address,
        shopping_cart: result.shopping_cart

      }
      const token = generateAccessToken(userToken)

      console.log(`'token:'${result}`)

      res.json({ token: `Bearer ${token}`, user: userToken });

    }
  })
});

userRouter.post('/register', function (req, res) {

  let user = new User({
    user_name: req.body.userName,
    user_email: req.body.email,
    user_password: req.body.password,
  });

  user.save(function (err, result) {
    if (err) {
      throw err
    }
    const userToken = {
      user_id: result._id,
      user_name: result.user_name,
      user_email: result.user_email,
    }
    const token = generateAccessToken(userToken)
    console.log(`'token:'${token}`)
    res.json({ token: `Bearer ${token}`, user: userToken });

  }
  )
});

userRouter.post('/getUserInfo', function (req, res) {
  console.log("user-id:" + req.body.user_id)

  User.findById(req.body.user_id, function (err, result) {
    if (err) console.error(err)
    res.json({ result })
  })
})

userRouter.post("/getAllUsersInfo", function (req, res) {
  console.log("manage")

  User.find({}, function (err, result) {
    console.log("manage" + result)
    if (err) console.error(err)

    res.json({ result })
  })
})

userRouter.post("/updateUserInfo", function (req, res) {

  const userInfo = {

    user_password: req.body.userPassword,
    user_address: req.body.userAddress,
    user_role: req.body.userRole,
    user_status: req.body.userStatus
  }
  User.updateOne({ _id: req.body.userId }, { $set: userInfo }, { new: true },

    function (err) {

      if (err) console.error(err)

      User.find({}, function (err, result) {
        if (err) console.error(err)
        res.json({ result })

      })


    })
})


userRouter.post('/setCartItem', function (req, res) {

  const { product_name, product_color, product_size, product_quantity } = req.body.productValue

  User.findOneAndUpdate({
    _id: req.body.user_id,
    shopping_cart: {
      "$elemMatch": { product_name, product_color, product_size }
    }
  }, {
    $inc: { 'shopping_cart.$.product_quantity': product_quantity }
  }, { new: true }, function (err, result) {
    if (err) {
      throw err
    }
    else if (!result) {
      User.findById(req.body.user_id, function (err, userValue) {
        if (err) {
          throw err
        }
        userValue.shopping_cart.push(req.body.productValue)
        userValue.save(function (err) {
          if (err) {
            throw err
          }
          res.send(200)
          console.log(`you have already been adding a product in the cart!`)
        })
      })
    }
  }
  );
})

userRouter.post('/updateItemQuantity', function (req, res) {

  User.findOneAndUpdate({
    _id: req.body.user_id, 'shopping_cart.product_mark': req.body.product_mark
  }, {
    $set: { 'shopping_cart.$.product_quantity': req.body.product_quantity }
  }, { new: true }, function (err, result) {
    if (err) console.error(err)
    setTimeout(() => { res.send(result); }, 500)

    console.log(result.shopping_cart)
  })
})

userRouter.post('/deleteCartItem', function (req, res) {

  User.findOneAndUpdate({
    _id: req.body.user_id, 'shopping_cart.product_mark': req.body.product_mark
  }, {
    $pull: {
      'shopping_cart': { product_mark: req.body.product_mark }
    }
  }, { new: true }, function (err, result) {
    if (err) console.error(err)
    res.send({ result }, 200)
  })
})
module.exports = userRouter
