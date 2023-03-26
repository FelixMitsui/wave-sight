const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')

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
app.use(cors({ origin: ['https://fox-clothing.herokuapp.com', 'http://localhost:8080'] }));
app.use(express.json());
app.use('/imgs', express.static('public/imgs'))
app.use(require("./routes/product"));
app.use(require("./routes/user"));

// get driver connection
const dbo = require("./db/conn");

const mongoDB = process.env.ATLAS_URI || process.env.MONGODB_URI

mongoose.connect(mongoDB
).then(() => console.log("成功運行")).catch((err) => console.log("運行失敗:" + err))
mongoose.Promise = global.Promise

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});