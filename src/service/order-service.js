const orderRepository = require("../repository/order-repository");

function create(orderData) {
    orderData.status = "pending";
    orderRepository.saveOrder(orderData);
}

function getUserOrders(userId, page) {
    page = parseInt(page || 1) || 1;
    if (page < 1) {
        page = 1;
    }
    const limit = 5;
    const skip = (page - 1) * limit;

    return orderRepository.getUserOrders(userId, limit, skip);
}

module.exports.create = create;
module.exports.getUserOrders = getUserOrders;

