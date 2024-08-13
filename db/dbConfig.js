const mongoose = require("mongoose");
const connection = async (URI) => {
  await mongoose.connect(URI);
};
module.exports = connection;
