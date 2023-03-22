const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose')
const mongoDB = 'mongodb+srv://arthur:azure2010@arthur-cluster.6ylrc.mongodb.net/WaveLight_db?retryWrites=true&w=majority'
mongoose.connect(mongoDB
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
const port = process.env.PORT || 5000;
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());
app.use('/imgs', express.static('public/imgs'))
app.use(require("./routes/product"));
app.use(require("./routes/user"));

// get driver connection

const dbo = require("./db/conn");

// 在你應用 JavaScript 檔案中包含了一個 script 標籤
// 的 index.html 中處理任何一個 route
// app.use('/*', function (request, res) {
//   console.log(__dirname)
//   res.sendFile(path.resolve(__dirname, '/Users/eden/react_bs_store/src', 'index.html'))

// })

app.listen(port, () => {

  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);


});