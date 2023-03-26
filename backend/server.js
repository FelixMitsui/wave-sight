const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose')
const mongoDB = process.env.MONGODB_URI;
console.log("mongoDB:" + mongoDB)
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
)
mongoose.Promise = global.Promise
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const app = express();
const router = express.Router()
var path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "2100000kb" }))
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;
app.use(cors({ origin: 'https://fox-clothing.herokuapp.com' }));
app.use(express.json());
app.use('/imgs', express.static('public/imgs'))
app.use(require("./routes/product"));
app.use(require("./routes/user"));

// get driver connection

const dbo = require("./db/conn");
app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});