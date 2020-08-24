const express = require('express');
const app = express();
const connectMongoDB = require('./utils/connectMongoDB');

const port = process.env.PORT || 8000;
connectMongoDB();
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
