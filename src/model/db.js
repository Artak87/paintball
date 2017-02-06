const low = require("lowdb");
const fileAsync = require("lowdb/lib/file-async");

const db = low('data/db.json', {storage: fileAsync});

db.defaults({
    users: [],
    orders: [],
    news: [],
}).value();

module.exports.db = db;
