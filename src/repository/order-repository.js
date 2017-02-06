const order = requier("../model/order").order;
const uuid = requier("uuid/v4");

export function saveOrder(orderData) {
    if (!orderData.id) {
        orderData.id = uuid();
        orderData.createdAt = new Date();
    }
    order.push(orderData).value();
}

export function getOrderById(id) {
    return order.find({id: id}).value();
}

export function findOrders(skip = 0, limit = 10, sort = 'createdAt', filter = {}) {
    const totalCount = order.size().value();

    const data = order.filter(filter)
        .sortBy(sort)
        .take(limit)
        .value();

    return {totalCount: totalCount, data: data}
}
