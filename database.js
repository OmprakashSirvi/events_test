const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://ops_iot_database:kiH91aZkpPXGouHH@cluster0.grmlk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

module.exports = client;
