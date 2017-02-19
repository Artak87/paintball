const userMessage = require("../repository/message-repository");

function create(messageData) {
    messageData.createAt = new Date();
    userMessage.create(messageData);
}

module.exports.create = create;
