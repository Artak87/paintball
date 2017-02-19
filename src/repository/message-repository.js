const message = require("../model/message").message;

function create(messageData) {
    message.push(messageData).value();
}

module.exports.create = create;
