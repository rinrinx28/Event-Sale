const mongoose = require("mongoose");

const trades = new mongoose.Schema(
  {
    id: String,
    maker: String,
    taker: String,
    contract: String,
    tokenid: Number,
    amount: Number,
    price_sale: Number,
    price_token: String,
    txhash: String,
    blocknumber: Number,
    marketplace: String,
  },
  { versionKey: false, _id: false },
);
const trades_data = mongoose.model("Trades-Data", trades);
module.exports = {
  trades_data,
};
