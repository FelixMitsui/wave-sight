const express = require("express");
const mongoose = require('mongoose')
const authentication = require("../utils/authentication")
const bcrypt = require('bcryptjs');
const userRouter = express.Router()
const { User } = require("../models/user");
const saltRounds = 10;
var path = require('path');

const skipSessionID = (req, res, next) => {
  req.sessionID = null;
  next();
};

userRouter.route('/api/auth').post(authentication, (req, res) => {

  User.findOne({ _id: req.decoded }).select('-create_at').exec((err, result) => {

    if (err) {
      console.error(err);
      return;
    }

    res.status(200).json(result);
  })
});

userRouter.post('/api/login', (req, res) => {

  const { user_email, user_password } = req.body

  User.findOne({ user_email }).select('-create_at').exec((err, result) => {

    if (err) {
      console.error(err)
      res.status(500).send('Server error')
      return
    }

    if (!result) {
      res.status(401).send('Email is incorrect.')
      return
    }

    bcrypt.compare(user_password, result.user_password, (err, isMatch) => {

      if (err || !isMatch) {
        res.status(401).send('Password is incorrect.')
        return;
      }

      if (isMatch) {

        req.session.user = result._id;
        res.status(200).json(result);

      }
    })
  })
});

userRouter.post('/api/logout', (req, res) => {

  req.session.destroy();
  res.clearCookie('user');
  res.status(200).send('Already logout');

})

userRouter.post('/api/register', (req, res) => {

  const { user_email, user_name, user_password } = req.body

  bcrypt.hash(user_password, saltRounds, (err, hash) => {

    if (err) {
      console.error(err);
      return;
    }

    let user = new User({ user_name, user_email, user_password: hash });

    user.save((err, result) => {

      if (err) {
        console.error(err)
        return
      }

      if (result) {
        req.session.user = result._id;
        res.status(200).json(result);
      }

    }
    )
  })
});

userRouter.post("/api/users/:id", skipSessionID, (req, res) => {

  const { userPhone, userAddress } = req.body;

  User.findByIdAndUpdate(req.params.id,
    { user_phone: userPhone, user_address: userAddress },
    (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!result) {
        res.status(404).send('Update failed.');
        return;
      }

      res.status(200).send('Has been update completed.');
    });
});

userRouter.patch("/api/users/:id/password", skipSessionID, (req, res) => {

  const { oldPassword, newPassword } = req.body;

  User.findById(req.params.id, (err, result) => {

    if (err) {
      console.error(err);
      return;
    }

    bcrypt.compare(oldPassword, result.user_password, (err, isMatch) => {

      if (err) {
        console.error(err);
        return;
      }
      if (!isMatch) {
        res.status(401).send("Old password incorrect.");
        return;
      }

      bcrypt.hash(newPassword, saltRounds, (err, hash) => {

        if (err) {
          console.error(err);
          return;
        }

        User.findByIdAndUpdate(
          result._id,
          { user_password: hash },
          { new: true },
          (err, result) => {
            if (err) {
              console.error(err);
              return;
            }
            res.status(200).send("The password has been updated.");
          }
        );
      });
    });
  });
});

userRouter.post("/api/users/:id/order", skipSessionID, (req, res) => {

  const orderInfo = req.body;

  User.findByIdAndUpdate(req.params.id, { $push: { user_order: orderInfo } }, { new: true }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    if (!result) {
      res.status(404).send("Create failed.");
      return;
    }
    res.status(200).send("Create completed.");
  });
});

userRouter.get("/api/users", skipSessionID, (req, res) => {

  User.find({}, '-user_password', (err, result) => {

    if (err) {
      console.error(err);
      return;
    }

    res.status(200).json(result)
  })
})

userRouter.patch("/api/users/:id", skipSessionID, (req, res) => {

  User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true },
    (err, result) => {
      if (err) {
        console.error(err)
        return;
      }
      if (!result) {
        res.status(404).send('Update failed.');
        return;
      }
      res.status(200).send('Update completed.');

    })
})


userRouter.post('/api/users/:id/cart', skipSessionID, (req, res) => {

  const { product_name, product_size, product_color } = req.body;

  User.findOneAndUpdate({
    _id: req.params.id,
    shopping_cart: {
      $elemMatch: {
        product_name: product_name,
        product_size: product_size,
        product_color: product_color
      }
    }
  }, {
    $inc: { 'shopping_cart.$.product_quantity': req.body.product_quantity }
  }, (err, result) => {

    if (err) {
      console.error(err);
      return;
    }

    if (!result) {

      User.findOneAndUpdate({
        _id: req.params.id
      }, { $push: { shopping_cart: req.body } }, (err, result) => {


        if (err) {
          console.error(err);
          return;
        }

        if (result) {
          res.status(200).send('Has been add a new item.');
          return;
        }

      })
    }

    if (result) {
      res.status(200).send('Has been add quantity of item.');
    }

  })
});


userRouter.patch('/api/users/:id/cart', skipSessionID, (req, res) => {

  const { sid } = req.body;

  User.findOneAndUpdate({
    _id: req.params.id,
    shopping_cart: {
      $elemMatch: {
        sid: sid
      }
    }
  }, {
    $set: { 'shopping_cart.$.product_quantity': req.body.product_quantity }
  }, { new: true }, (err, result) => {

    if (err) {
      console.error(err);
      return
    }

    if (!result) {
      res.status(404).send('Update quantity failed.');
      return
    }
    res.status(200).send('Update quantity completed.');
  })
})

userRouter.delete('/api/users/:id/cart', skipSessionID, (req, res) => {

  User.findOneAndUpdate({
    _id: req.params.id,
  }, {
    $pull: {
      shopping_cart: {
        sid: req.query.sid,
      }
    }
  }, { new: true }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    if (!result) {
      res.status(404).send('error occurred.');
      console.log('error occurred.')
      return;
    }
    console.log('Has been removed.')
    res.status(200).send('Has been removed.');
  })

});
userRouter.delete('/api/users/:id/cart', skipSessionID, (req, res) => {

  User.findOneAndUpdate({
    _id: req.params.id
  }, {
    shopping_cart: []
  }, { new: true }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    if (!result) {
      res.status(404).send('Error occurred.');
    }
    res.status(200).send('Has been removed all.');
  })
})


module.exports = userRouter;
