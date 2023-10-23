const mongoose = require("mongoose");
const Db = process.env.ATLAS_URI;

mongoose.connect(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Successfully connected to MongoDB.");
}).catch((err) => {
  console.log("MongoDB connection failed: " + err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose.connection;