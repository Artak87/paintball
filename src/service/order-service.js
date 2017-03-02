const co = require('co');
const orderRepository = require('../repository/order-repository');
const paypal = require('../payment/paypal');

function * create(orderData) {
    orderData.status = 'pending';
    orderData = orderRepository.saveOrder(orderData);
    orderData.payment = yield paypal.create(orderData);
    orderRepository.saveOrder(orderData);
    return orderData;
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

module.exports.create = co.wrap(create);
module.exports.getUserOrders = getUserOrders;
