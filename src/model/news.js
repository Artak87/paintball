const db = require("./db").db;

module.exports.news = db.get("news");
