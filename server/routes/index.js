const express = require('express');
const indexRouter = express.Router();

/* GET  page */
indexRouter.get(/^\/(?!api\/).*/, (req, res, next) => {

  if (!process.env.NODE_ENV === 'production') next();

  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));

});
module.exports = indexRouter;
