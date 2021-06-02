var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CoinSchema = new Schema({
  name: String,
  quantity: Number,
  averagePric: Number,
});

module.exports = mongoose.model("Coin", CoinSchema);
