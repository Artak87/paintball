const user = require("../model/user").user;

function saveUser(userData) {
    user.push(userData).value();
}

function getUserById(id) {
    return user.find({id: id}).value();
}

module.exports.saveUser = saveUser;
module.exports.getUserById = getUserById;
