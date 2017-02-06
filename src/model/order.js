const db = require("./db").db;

module.exports.order = db.get("orders");
