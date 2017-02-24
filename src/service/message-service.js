const messageRepository = require("../repository/message-repository");

function create(messageData) {
    messageRepository.saveMessage(messageData);
}

module.exports.create = create;
