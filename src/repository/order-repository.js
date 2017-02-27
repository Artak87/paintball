const order = require("../model/order").order;
const uuid = require("uuid/v4");

function saveOrder(orderData) {
    if (!orderData.id) {
        orderData.id = uuid();
        orderData.createdAt = new Date();
        order.push(orderData).value();
        return orderData;
    }
    orderData.updatedAt = new Date();
    order.find({id: orderData.id})
        .assign(orderData)
        .value();
    return orderData;
}

function getOrderById(id) {
    return order.find({id: id}).value();
}

function findOrders(skip = 0, limit = 10, filter = {}, sort = 'createdAt') {
    const totalCount = order.filter(filter).size().value();

    const data = order.filter(filter)
        .sortBy(sort)
        .take(limit)
        .value();

    return {totalCount: totalCount, data: data}
}

function getUserOrders(userId, limit, skip) {
    return findOrders(skip, limit, {userId: userId});
}

module.exports.saveOrder = saveOrder;
module.exports.getOrderById = getOrderById;
module.exports.findOrders = findOrders;
module.exports.getUserOrders = getUserOrders;
