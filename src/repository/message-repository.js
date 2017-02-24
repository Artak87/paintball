const message = require("../model/message").message;
const uuid = require("uuid/v4");

function saveMessage(messageData) {
    if (!messageData.id) {
        messageData.id = uuid();
        messageData.createdAt = new Date();
    }
    message.push(messageData).value();
}

module.exports.saveMessage = saveMessage;
