const order = require("../model/order").order;
const uuid = require("uuid/v4");

function saveOrder(orderData) {
    if (!orderData.id) {
        orderData.id = uuid();
        orderData.createdAt = new Date();
    }
    order.push(orderData).value();
}

function getOrderById(id) {
    return order.find({id: id}).value();
}

function findOrders(skip = 0, limit = 10, sort = 'createdAt', filter = {}) {
    const totalCount = order.size().value();

    const data = order.filter(filter)
        .sortBy(sort)
        .take(limit)
        .value();

    return {totalCount: totalCount, data: data}
}

module.exports.saveOrder = saveOrder;
module.exports.getOrderById = getOrderById;
module.exports.findOrders = findOrders;