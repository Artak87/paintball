const db = require("./db").db;

module.exports.message = db.get("messages");
