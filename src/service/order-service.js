const orderRepository = require("../repository/order-repository");

function create(orderData) {
    orderData.status = "pending";
    orderRepository.saveOrder(orderData);
}

module.exports.create = create;
