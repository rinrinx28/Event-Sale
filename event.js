const { createConnection } = require("mysql");
require("dotenv").config();
const { ethers, utils } = require("ethers");
const chalk = require("chalk");
var CryptoJS = require("crypto-js");
const mongoose = require("mongoose");
const { trades_data } = require("./schema/schema-type");

var looksrares = chalk.hex("#66FF00");
var blurs = chalk.hex("#FFAC1C");
var opensea = chalk.hex("#15B2E5");

const network = "homestead";

var mysql_config_new = {
  connectionLimit: 2,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASEs,
  port: 3306,
  charset: "utf8mb4",
};

const provider = new ethers.providers.InfuraProvider(
  network,
  process.env.infura_api,
);

var db = createConnection(mysql_config_new);
// db.connect(function (err) {
//   if (err) {
//     console.log("error connecting: " + err.stack);
//     return;
//   }
//   console.log(`Connected as id ${db.threadId}`);
// });

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.mongoose, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Đã kết nối với DB");
  })
  .catch((err) => {
    console.log(err);
  });

//* ———————————————[Config Marketplace]———————————————
var seaport = "0x00000000006c3852cbEf3e08E8dF289169EdE581"; // Contract Opensea Seaport 1.1
var Transfer_Helper_OPS = "0x0000000000c2d145a2526bD8C716263bFeBe1A72"; // OpenSea: Transfer Helper
// var blur_Marketplace = "0x000000000000Ad05Ccc4F10045630fb830B95127"; // Blur.io: Marketplace 2
// var blur_Marketplace1 = "0x000000000000Ad05Ccc4F10045630fb830B95127"; // Blur.io: Marketplace 1
var looksrare = "0x59728544B08AB483533076417FbBB2fD0B17CE3a"; // LooksRare: Exchange
//* ——————————————————————————————————————————

//* ———————————————[Get Token Sale On Multi Marketplace]———————————————

//TODO ———————————————[Config SecretKey]———————————————
var secretkey = process.env.secretkey;
var secretkeyHash = CryptoJS.SHA256(secretkey).toString(CryptoJS.enc.Hex);
//TODO ————————————————————————————————————————————————

/**
 * @Blur Marketplace 2
 * @OrdersMatched Event [ID: 0x61cbb2a3dee0b6064c2e681aadd61677fb4ef319f0b547508d495626f5a62f64]
 */
/**
 * @LooksRare MarketPlace
 * @TakeArk Event => Offer [ID : 0x68cd251d4d267c6e2034ff0088b990352b97b2002c0476587d0c4da889c11330]
 * @TakeBid Event => Buy on Sell [ID: 0x95fb6205e23ff6bda16a2d1dba56b9ad7c783f67c96fa149785052f47696f2be]
 */

const blur = {
  // address: blur_Marketplace,
  topics: [
    "0x61cbb2a3dee0b6064c2e681aadd61677fb4ef319f0b547508d495626f5a62f64",
  ],
};

const TakeArk = {
  address: looksrare,
  topics: [
    "0x68cd251d4d267c6e2034ff0088b990352b97b2002c0476587d0c4da889c11330",
  ],
};

const TakeBid = {
  address: looksrare,
  topics: [
    "0x95fb6205e23ff6bda16a2d1dba56b9ad7c783f67c96fa149785052f47696f2be",
  ],
};

const seaports = {
  address: seaport,
  topics: [
    "0x9d9af8e38d66c62e2c12f0225249fd9d721c54b83f48d9352c97c6cacdcb6f31",
  ],
};

const x2y2 = {
  address: "0x74312363e45DCaBA76c59ec49a7Aa8A65a67EeD3",
  topics: [
    "0x3cbb63f144840e5b1b0a38a7c19211d2e89de4d7c5faf8b2d3c1776c302d1d33",
  ],
};

// provider.addListener(blur, (log, event) => {
//   const blur_abi = require("./abi/blur2.json");
//   const abi = blur_abi
//     .filter((v) => v.type === "event")
//     .filter((v) => v.name === "OrdersMatched");
//   let iface = new ethers.utils.Interface(abi);
//   let data = log.data;
//   let topics = log.topics;
//   let { maker, taker, sell, sellHash, buy, buyHash } = iface.decodeEventLog(
//     "OrdersMatched",
//     data,
//     topics,
//   );
//   let id = `${parseInt(sell.tokenId._hex, 16)}/` + `${log.transactionHash}`;
//   var id_encrypted = CryptoJS.AES.encrypt(id, secretkeyHash).toString();
//   let eth = "0x0000000000000000000000000000000000000000";
//   let weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
//   let contract = sell.collection;
//   let tokenid = parseInt(sell.tokenId._hex, 16);
//   let amount = parseInt(sell.amount._hex, 16);
//   let price = parseInt(sell.price._hex, 16);
//   let token_payment =
//     sell.paymentToken === eth
//       ? "ETH"
//       : sell.paymentToken === weth
//       ? "WETH"
//       : sell.paymentToken;
//   let txhash = log.transactionHash;
//   let blockNumber = log.blockNumber;
//   if (tokenid < 1e9) {
//     updateTrades(
//       id_encrypted,
//       maker,
//       taker,
//       contract,
//       tokenid,
//       amount,
//       price,
//       token_payment,
//       txhash,
//       blockNumber,
//       "Blur",
//     ).then((n) => {
//       console.log(n);
//     });
//   } else {
//     console.log(`${blurs(`[Blur Trade]`)} Not Update Token : ${tokenid}`);
//   }
// });

// provider.addListener(seaports, (log, event) => {
//   const ops_abi = require("./abi/seaport.json");
//   const abi = ops_abi
//     .filter((v) => v.type === "event")
//     .filter((v) => v.name === "OrderFulfilled");
//   let iface = new ethers.utils.Interface(abi);
//   let data = log.data;
//   let topics = log.topics;
//   let price_sale = [];
//   let price_token = "";
//   let tokenId_type = 0;
//   let contract_type = "true";
//   let amount = 0;
//   let { orderHash, offerer, zone, recipient, offer, consideration } =
//     iface.decodeEventLog("OrderFulfilled", data, topics);
//   /**
//    * Offer ItemType: 1 = Other Token | 3 = TokenID
//    * Consideration ItemType: 0 = ETH |  1 = Order Token Price | 2 = TokenID
//    */
//   offer.map((v) => {
//     if (v.itemType === 3) {
//       if (parseInt(v.identifier._hex, 16) < 1e9) {
//         tokenId_type = parseInt(v.identifier._hex, 16);
//         contract_type = `${v.token}`;
//         amount = parseInt(v.amount._hex, 16);
//       } else {
//         contract_type = "false";
//       }
//     } else if (v.itemType === 1) {
//       price_sale.push(parseInt(v.amount._hex, 16));
//       price_token =
//         v.token === "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
//           ? "WETH"
//           : v.token;
//     } else {
//       if (parseInt(v.identifier._hex, 16) < 1e9) {
//         tokenId_type = parseInt(v.identifier._hex, 16);
//         contract_type = `${v.token}`;
//         amount = parseInt(v.amount._hex, 16);
//       } else {
//         contract_type = "false";
//       }
//     }
//   });
//   consideration.map((v) => {
//     if (contract_type === "false") return;
//     if (v.itemType === 0) {
//       price_sale.push(parseInt(v.amount._hex, 16));
//       price_token = "ETH";
//     } else if (v.itemType === 1) {
//       if (price_sale.length < 1) {
//         price_sale.push(parseInt(v.amount._hex, 16));
//         price_token =
//           v.token === "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
//             ? "WETH"
//             : v.token;
//       }
//     } else if (v.itemType === 2) {
//       tokenId_type = parseInt(v.identifier._hex, 16);
//       contract_type = `${v.token}`;
//       amount = parseInt(v.amount._hex, 16);
//     } else if (v.itemType === 3) {
//       if (parseInt(v.identifier._hex, 16) < 1e9) {
//         tokenId_type = parseInt(v.identifier._hex, 16);
//         contract_type = `${v.token}`;
//         amount = parseInt(v.amount._hex, 16);
//       } else {
//         contract_type = "false";
//         console.log(`${opensea("[Opensea Trade]")} Consideration Type 3`, v);
//       }
//     } else {
//       console.log(`${opensea("[Opensea Trade]")} Consideration`, v);
//     }
//   });
//   let price = price_sale.reduce((a, b) => a + b, 0);
//   let blocknumber = log.blockNumber;
//   if (contract_type === "false") {
//     console.log(
//       `${opensea("[Opensea Trade]")} Not Update Trades ${log.transactionHash}`,
//     );
//   } else {
//     let id = `${tokenId_type}/` + `${log.transactionHash}`;
//     var id_encrypted = CryptoJS.AES.encrypt(id, secretkeyHash).toString();
//     var maker = offerer;
//     var taker = recipient;
//     var contract = contract_type;
//     var tokenid = tokenId_type;
//     var price_db = price;
//     var token_payment = price_token;
//     var txhash = log.transactionHash;
//     if (contract === "0x0000000000000000000000000000000000000000") {
//       let datas = iface.decodeEventLog("OrderFulfilled", data, topics);
//       console.log(datas);
//     } else {
//       updateTrades(
//         id_encrypted,
//         maker,
//         taker,
//         contract,
//         tokenid,
//         amount,
//         price_db,
//         token_payment,
//         txhash,
//         blocknumber,
//         "Opensea",
//       ).then((n) => {
//         console.log(n);
//       });
//     }
//   }
// });

// provider.addListener(TakeArk, (log, event) => {
//   const ask_abi = require("./abi/looksrare.json");
//   const abi = ask_abi
//     .filter((v) => v.type === "event")
//     .filter((v) => v.name === "TakerAsk");
//   let iface = new ethers.utils.Interface(abi);
//   let data = log.data;
//   let topics = log.topics;
//   let {
//     orderHash,
//     orderNonce,
//     taker,
//     maker,
//     strategy,
//     currency,
//     collection,
//     tokenId,
//     amount,
//     price,
//   } = iface.decodeEventLog("TakerAsk", data, topics);
//   if (parseInt(tokenId._hex, 16) < 1e9) {
//     let blockNumber = log.blockNumber;
//     let id = `${parseInt(tokenId._hex, 16)}/` + `${log.transactionHash}`;
//     var id_encrypted = CryptoJS.AES.encrypt(id, secretkeyHash).toString();
//     var contract = collection;
//     var tokenid = parseInt(tokenId._hex, 16);
//     var price_db = parseInt(price._hex, 16);
//     var token_payment =
//       currency === "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
//         ? "WETH"
//         : currency;
//     var amount_db = parseInt(amount._hex, 16);
//     var txhash = log.transactionHash;
//     updateTrades(
//       id_encrypted,
//       maker,
//       taker,
//       contract,
//       tokenId,
//       amount_db,
//       price_db,
//       token_payment,
//       txhash,
//       blockNumber,
//       "LooksRare",
//     ).then((n) => {
//       console.log(n);
//     });
//   } else {
//     console.log(
//       `${looksrares(`[LooksRare Trade TakerAsk]`)} Not Update - Txhash: ${
//         log.transactionHash
//       }`,
//     );
//   }
// });

// provider.addListener(TakeBid, (log, event) => {
//   const bid_abi = require("./abi/looksrare.json");
//   const abi = bid_abi
//     .filter((v) => v.type === "event")
//     .filter((v) => v.name === "TakerBid");
//   let iface = new ethers.utils.Interface(abi);
//   let data = log.data;
//   let topics = log.topics;
//   let {
//     orderHash,
//     orderNonce,
//     taker,
//     maker,
//     strategy,
//     currency,
//     collection,
//     tokenId,
//     amount,
//     price,
//   } = iface.decodeEventLog("TakerBid", data, topics);
//   if (parseInt(tokenId._hex, 16) < 1e9) {
//     let blockNumber = log.blockNumber;
//     let id = `${parseInt(tokenId._hex, 16)}/` + `${log.transactionHash}`;
//     var id_encrypted = CryptoJS.AES.encrypt(id, secretkeyHash).toString();
//     var contract = collection;
//     var tokenid = parseInt(tokenId._hex, 16);
//     var price_db = parseInt(price._hex, 16);
//     var token_payment =
//       currency === "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
//         ? "WETH"
//         : currency;
//     var amount_db = parseInt(amount._hex, 16);
//     var txhash = log.transactionHash;
//     updateTrades(
//       id_encrypted,
//       maker,
//       taker,
//       contract,
//       tokenId,
//       amount_db,
//       price_db,
//       token_payment,
//       txhash,
//       blockNumber,
//       "LooksRare",
//     ).then((n) => {
//       console.log(n);
//     });
//   } else {
//     console.log(
//       `${looksrares(`[LooksRare Trade TakerBid]`)} Not Update - Txhash: ${
//         log.transactionHash
//       }`,
//     );
//   }
// });

provider.addListener(x2y2, async (log, event) => {
  const x2y2_abi = require("./abi/x2y2.json");
  const abi = x2y2_abi.filter((n) => n.name === "EvInventory");
  let iface = new ethers.utils.Interface(abi);
  let data = iface.decodeEventLog("EvInventory", log.data, log.topics);
  console.log(data.detail, data.detail.fees, data, log.transactionHash);
});

async function updateTrades(
  id,
  maker,
  taker,
  contract,
  tokenid,
  amount,
  price_sale,
  price_token,
  txhash,
  blocknumber,
  marketplace,
) {
  return await new Promise(async (res, rej) => {
    await trades_data.findOneAndUpdate(
      {
        id: id,
      },
      {
        $set: {
          id: id,
          maker: maker,
          taker: taker,
          contract: contract,
          tokenid: tokenid,
          amount: amount,
          price_sale: price_sale,
          price_token: price_token,
          txhash: txhash,
          blocknumber: blocknumber,
          marketplace: marketplace,
        },
      },
      {
        upsert: true,
        new: true,
      },
    );
    res(
      `${
        marketplace === "Opensea"
          ? opensea("[Opensea Trade]")
          : marketplace === "Blur"
          ? blurs("[Blur Trade]")
          : looksrares("[LooksRare Trade]")
      } TokenId : ${tokenid} - Price: ${price_sale} - TxHash: ${txhash}`,
    );
  });
}

// * ——————————————————————————————————————————
