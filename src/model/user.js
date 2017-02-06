const db = require("./db").db;

module.exports.user = db.get("users");
