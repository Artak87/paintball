const paypal = require('paypal-rest-sdk');
const __ = require('../i18n').__;

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AdG8yXERChWGmLWy0n8xK2x9pLCHLSVcb2-aRqfiOllfPTPK1jyi4Q2bTWQBP7qFht1b5Zoap9qMY48Z',
    'client_secret': 'EHWoYKwqEd6f_0NObHUFfwyIatwOMiGZcish6j1VjYTNJRt7f6-0f-Q1lLKCLdIHtT97B1lWNfw5jqPZ'
});

function generateOrderDescription(orderData) {
    let description = __('Order at paintball');
    description += '\n' + __('Players Number') + ': ' + orderData['playersNumber'];
    description += '\n' + __('Time start') + ': ' + orderData['startTime'];
    description += '\n' + __('Duration') + ': ' + orderData['duration'];

    return description;
}

function create(orderData) {
    const total = Number(orderData.price).toFixed(2);
    const description = generateOrderDescription(orderData);
    const payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/payment/execute/paypal",
            "cancel_url": "http://localhost:3000/payment/cancel/paypal"
        },
        "transactions": [{
            "amount": {
                "total": total,
                "currency": "USD"
            },
            "description": description,
        }]
    };

    return new Promise((resolve, reject) => {
        paypal.payment.create(payment, function (error, payment) {
            if (error) {
                return reject(error);
            }
            if (payment.payer.payment_method === 'paypal') {
                const paymentId = payment.id;
                let redirectUrl;
                for (let i = 0; i < payment.links.length; i++) {
                    let link = payment.links[i];
                    if (link.method === 'REDIRECT') {
                        redirectUrl = link.href;
                    }
                }
                return resolve({
                    paymentId: paymentId,
                    redirectUrl: redirectUrl,
                    payment: payment,
                });
            }
            reject(new Error(__('Incorrect payment method.')));
        });
    });
}

function execute(req, res, next) {

}


function cancel(req, res, next) {

}


module.exports.create = create;
module.exports.execute = execute;
module.exports.cancel = cancel;
